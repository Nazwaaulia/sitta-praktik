document.addEventListener(
    "DOMContentLoaded",
    function () {


        // ==========================================
        // RINGKASAN
        // ==========================================

        var reportJenis =
            document.getElementById(
                "reportJenis"
            );


        var reportStok =
            document.getElementById(
                "reportStok"
            );


        var reportTracking =
            document.getElementById(
                "reportTracking"
            );


        if (reportJenis) {

            reportJenis.textContent =
                dataBahanAjar.length;

        }


        var totalStok = 0;


        dataBahanAjar.forEach(
            function (barang) {

                totalStok +=
                    Number(barang.stok);

            }
        );


        if (reportStok) {

            reportStok.textContent =
                totalStok.toLocaleString("id-ID");

        }


        if (reportTracking) {

            reportTracking.textContent =
                Object.keys(dataTracking).length;

        }



        // ==========================================
        // REKAP BAHAN AJAR
        // ==========================================

        var tabelLaporan =
            document.getElementById(
                "tabelLaporan"
            );


        if (tabelLaporan) {

            dataBahanAjar.forEach(
                function (barang, index) {

                    var row =
                        document.createElement("tr");


                    var keterangan;


                    if (barang.stok >= 300) {

                        keterangan =
                            "Stok Aman";

                    }
                    else if (barang.stok >= 200) {

                        keterangan =
                            "Stok Cukup";

                    }
                    else {

                        keterangan =
                            "Stok Terbatas";

                    }


                    row.innerHTML =

                        "<td>" +
                        (index + 1) +
                        "</td>" +

                        "<td>" +
                        barang.kodeBarang +
                        "</td>" +

                        "<td>" +
                        barang.namaBarang +
                        "</td>" +

                        "<td>" +
                        barang.jenisBarang +
                        "</td>" +

                        "<td>" +
                        barang.edisi +
                        "</td>" +

                        "<td>" +
                        barang.stok +
                        "</td>" +

                        "<td>" +
                        keterangan +
                        "</td>";


                    tabelLaporan.appendChild(
                        row
                    );

                }
            );

        }



        // ==========================================
        // MONITORING PROGRESS DO
        // ==========================================

        var tabelProgress =
            document.getElementById(
                "tabelProgress"
            );


        if (tabelProgress) {

            var daftarDO =
                Object.values(dataTracking);


            daftarDO.forEach(
                function (data, index) {

                    var row =
                        document.createElement("tr");


                    row.innerHTML =

                        "<td>" +
                        (index + 1) +
                        "</td>" +

                        "<td>" +
                        data.nomorDO +
                        "</td>" +

                        "<td>" +
                        data.nama +
                        "</td>" +

                        "<td>" +
                        data.ekspedisi +
                        "</td>" +

                        "<td>" +
                        data.status +
                        "</td>" +

                        "<td>" +
                        data.tanggalKirim +
                        "</td>";


                    tabelProgress.appendChild(
                        row
                    );

                }
            );

        }

    }
);