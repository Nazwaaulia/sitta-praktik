
document.addEventListener("DOMContentLoaded", function () {

    // ==================================================
    // DATA PENGGUNA
    // ==================================================

    function ambilSemuaPengguna() {
        let akunTerdaftar = [];

        try {
            akunTerdaftar = JSON.parse(
                localStorage.getItem("akunTerdaftar") || "[]"
            );
        } catch (error) {
            akunTerdaftar = [];
        }

        let akunBawaan =
            typeof dataPengguna !== "undefined" &&
            Array.isArray(dataPengguna)
                ? dataPengguna
                : [];

        return akunBawaan.concat(akunTerdaftar);
    }

    // ==================================================
    // LOGIN
    // ==================================================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document
                .getElementById("email")
                .value.trim().toLowerCase();

            const password = document
                .getElementById("password")
                .value;

            const pengguna = ambilSemuaPengguna().find(function (user) {
                return (
                    String(user.email).toLowerCase() === email &&
                    user.password === password
                );
            });

            if (pengguna) {
                localStorage.setItem(
                    "userLogin",
                    JSON.stringify(pengguna)
                );

                alert(
                    "Login berhasil!\n\nSelamat datang, " +
                    pengguna.nama
                );

                window.location.href = "dashboard.html";
            } else {
                alert("Email atau password yang dimasukkan salah.");
            }
        });
    }

    // ==================================================
    // LUPA PASSWORD: BUKA DAN TUTUP MODAL
    // ==================================================

    const forgotPasswordBtn =
        document.getElementById("forgotPasswordBtn");

    const forgotModal =
        document.getElementById("forgotModal");

    const closeForgotModal =
        document.getElementById("closeForgotModal");

    if (forgotPasswordBtn && forgotModal) {
        forgotPasswordBtn.addEventListener("click", function () {
            forgotModal.style.display = "flex";
        });
    }

    if (closeForgotModal && forgotModal) {
        closeForgotModal.addEventListener("click", function () {
            forgotModal.style.display = "none";
        });
    }

    // ==================================================
    // DAFTAR: BUKA DAN TUTUP MODAL
    // ==================================================

    const registerBtn =
        document.getElementById("registerBtn");

    const registerModal =
        document.getElementById("registerModal");

    const closeRegisterModal =
        document.getElementById("closeRegisterModal");

    if (registerBtn && registerModal) {
        registerBtn.addEventListener("click", function () {
            registerModal.style.display = "flex";
        });
    }

    if (closeRegisterModal && registerModal) {
        closeRegisterModal.addEventListener("click", function () {
            registerModal.style.display = "none";
        });
    }

    // ==================================================
    // TUTUP MODAL KETIKA KLIK DI LUAR KOTAK
    // ==================================================

    window.addEventListener("click", function (event) {
        if (forgotModal && event.target === forgotModal) {
            forgotModal.style.display = "none";
        }

        if (registerModal && event.target === registerModal) {
            registerModal.style.display = "none";
        }
    });

    // ==================================================
    // FORM LUPA PASSWORD
    // ==================================================

    const forgotForm =
        document.getElementById("forgotForm");

    if (forgotForm) {
        forgotForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document
                .getElementById("forgotEmail")
                .value.trim()
                .toLowerCase();

            const pengguna = ambilSemuaPengguna().find(function (user) {
                return String(user.email).toLowerCase() === email;
            });

            if (pengguna) {
                alert(
                    "Email ditemukan!\n\nAkun atas nama " +
                    pengguna.nama +
                    " terdaftar pada sistem."
                );
            } else {
                alert("Email tidak ditemukan.");
            }
        });
    }

    // ==================================================
    // FORM PENDAFTARAN PENGGUNA
    // ==================================================

    const registerForm =
        document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nama = document
                .getElementById("registerNama")
                .value.trim();

            const email = document
                .getElementById("registerEmail")
                .value.trim()
                .toLowerCase();

            const password = document
                .getElementById("registerPassword")
                .value;

            if (!nama || !email || !password) {
                alert("Semua kolom wajib diisi.");
                return;
            }

            if (password.length < 6) {
                alert("Password minimal 6 karakter.");
                return;
            }

            const semuaPengguna = ambilSemuaPengguna();

            const emailSudahAda = semuaPengguna.some(function (user) {
                return String(user.email).toLowerCase() === email;
            });

            if (emailSudahAda) {
                alert("Email sudah terdaftar.");
                return;
            }

            const akunBaru = {
                nama: nama,
                email: email,
                password: password,
                role: "Pengguna",
                lokasi: "Belum ditentukan"
            };

            let akunTerdaftar = [];

            try {
                akunTerdaftar = JSON.parse(
                    localStorage.getItem("akunTerdaftar") || "[]"
                );
            } catch (error) {
                akunTerdaftar = [];
            }

            akunTerdaftar.push(akunBaru);

            localStorage.setItem(
                "akunTerdaftar",
                JSON.stringify(akunTerdaftar)
            );

            alert(
                "Pendaftaran berhasil!\n\n" +
                "Nama: " + nama +
                "\nEmail: " + email +
                "\nSilakan login menggunakan akun tersebut."
            );

            registerForm.reset();

            if (registerModal) {
                registerModal.style.display = "none";
            }
        });
    }

    // ==================================================
    // TRACKING PENGIRIMAN
    // ==================================================

    const trackingForm =
        document.getElementById("trackingForm");

    const trackingResult =
        document.getElementById("trackingResult");

    if (trackingForm) {
        trackingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nomorDO = document
                .getElementById("nomorDO")
                .value.trim();

            const data =
                typeof dataTracking !== "undefined"
                    ? dataTracking[nomorDO]
                    : null;

            if (!data) {
                alert(
                    "Nomor DO tidak ditemukan.\n\n" +
                    "Silakan periksa kembali nomor DO."
                );

                if (trackingResult) {
                    trackingResult.style.display = "none";
                }

                return;
            }

            const isiElemen = {
                trackingNomorDO: data.nomorDO,
                trackingNama: data.nama,
                trackingStatus: data.status,
                trackingEkspedisi: data.ekspedisi,
                trackingTanggal: data.tanggalKirim,
                trackingPaket: data.paket,
                trackingTotal: data.total
            };

            Object.keys(isiElemen).forEach(function (id) {
                const elemen = document.getElementById(id);

                if (elemen) {
                    elemen.textContent = isiElemen[id];
                }
            });

            const timeline =
                document.getElementById("trackingTimeline");

            if (timeline) {
                timeline.innerHTML = "";

                (data.perjalanan || []).forEach(function (perjalanan) {
                    const item = document.createElement("div");
                    item.className = "timeline-item";

                    const titik = document.createElement("div");
                    titik.className = "timeline-dot";

                    const konten = document.createElement("div");
                    konten.className = "timeline-content";

                    const waktu = document.createElement("strong");
                    waktu.textContent = perjalanan.waktu;

                    const keterangan = document.createElement("p");
                    keterangan.textContent = perjalanan.keterangan;

                    konten.appendChild(waktu);
                    konten.appendChild(keterangan);

                    item.appendChild(titik);
                    item.appendChild(konten);

                    timeline.appendChild(item);
                });
            }

            if (trackingResult) {
                trackingResult.style.display = "block";

                trackingResult.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    }

    // ==================================================
    // INFORMASI BAHAN AJAR
    // ==================================================

    const tabelBahanAjar =
        document.getElementById("tabelBahanAjar");

    const searchBahanAjar =
        document.getElementById("searchBahanAjar");

    const searchBtn =
        document.getElementById("searchBtn");

    const resetSearchBtn =
        document.getElementById("resetSearchBtn");

    const jumlahData =
        document.getElementById("jumlahData");

    // Menampilkan data bahan ajar
    function tampilkanBahanAjar(data) {
        if (!tabelBahanAjar) {
            return;
        }

        tabelBahanAjar.innerHTML = "";

        if (!data || data.length === 0) {
            const rowKosong = document.createElement("tr");

            const kolomKosong = document.createElement("td");
            kolomKosong.colSpan = 7;
            kolomKosong.style.textAlign = "center";
            kolomKosong.textContent = "Data bahan ajar tidak ditemukan.";

            rowKosong.appendChild(kolomKosong);
            tabelBahanAjar.appendChild(rowKosong);
        } else {
            data.forEach(function (barang, index) {
                const row = document.createElement("tr");

                [
                    index + 1,
                    barang.kodeLokasi,
                    barang.kodeBarang,
                    barang.namaBarang,
                    barang.jenisBarang,
                    barang.edisi,
                    barang.stok
                ].forEach(function (nilai) {
                    const td = document.createElement("td");
                    td.textContent = nilai;
                    row.appendChild(td);
                });

                tabelBahanAjar.appendChild(row);
            });
        }

        if (jumlahData) {
            jumlahData.textContent = data ? data.length : 0;
        }
    }

    if (
        tabelBahanAjar &&
        typeof dataBahanAjar !== "undefined"
    ) {
        tampilkanBahanAjar(dataBahanAjar);
    }

    // Pencarian bahan ajar
    function cariBahanAjar() {
        if (
            !searchBahanAjar ||
            typeof dataBahanAjar === "undefined"
        ) {
            return;
        }

        const keyword = searchBahanAjar.value
            .trim()
            .toLowerCase();

        if (keyword === "") {
            tampilkanBahanAjar(dataBahanAjar);
            return;
        }

        const hasil = dataBahanAjar.filter(function (barang) {
            return [
                barang.kodeLokasi,
                barang.kodeBarang,
                barang.namaBarang,
                barang.jenisBarang
            ].some(function (nilai) {
                return String(nilai)
                    .toLowerCase()
                    .includes(keyword);
            });
        });

        tampilkanBahanAjar(hasil);
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", cariBahanAjar);
    }

    if (searchBahanAjar) {
        searchBahanAjar.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                cariBahanAjar();
            }
        });
    }

    if (resetSearchBtn) {
        resetSearchBtn.addEventListener("click", function () {
            if (searchBahanAjar) {
                searchBahanAjar.value = "";
            }

            if (typeof dataBahanAjar !== "undefined") {
                tampilkanBahanAjar(dataBahanAjar);
            }
        });
    }

    // ==================================================
    // DASHBOARD: INFORMASI PENGGUNA
    // ==================================================

    const userData = localStorage.getItem("userLogin");

    if (userData) {
        try {
            const penggunaLogin = JSON.parse(userData);

            const namaPengguna =
                document.getElementById("namaPengguna");

            if (namaPengguna) {
                namaPengguna.textContent = penggunaLogin.nama || "-";
            }

            const rolePengguna =
                document.getElementById("rolePengguna");

            if (rolePengguna) {
                rolePengguna.textContent = penggunaLogin.role || "-";
            }

            const lokasiPengguna =
                document.getElementById("lokasiPengguna");

            if (lokasiPengguna) {
                lokasiPengguna.textContent = penggunaLogin.lokasi || "-";
            }

            const greeting =
                document.getElementById("greeting");

            if (greeting) {
                const jam = new Date().getHours();
                let sapaan;

                if (jam >= 5 && jam < 11) {
                    sapaan = "Selamat pagi";
                } else if (jam >= 11 && jam < 15) {
                    sapaan = "Selamat siang";
                } else if (jam >= 15 && jam < 18) {
                    sapaan = "Selamat sore";
                } else {
                    sapaan = "Selamat malam";
                }

                greeting.textContent =
                    sapaan + ", " + (penggunaLogin.nama || "Pengguna") + "!";
            }
        } catch (error) {
            console.error("Data pengguna login tidak valid:", error);
        }
    }

    // ==================================================
    // LOGOUT
    // ==================================================

    const logoutBtn =
        document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            const konfirmasi = confirm(
                "Apakah Anda yakin ingin logout?"
            );

            if (konfirmasi) {
                localStorage.removeItem("userLogin");
                window.location.href = "index.html";
            }
        });
    }

});
