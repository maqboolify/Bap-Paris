import { useState } from "react";

const audiModelImages = {
  "A1": "https://static.moniteurautomobile.be/imgcontrol/images_tmp/clients/moniteur/c1440-d720/content/medias/images/news/28000/500/60/audi-a1-2018-01.jpg",
  "A2": "https://upload.wikimedia.org/wikipedia/commons/f/f3/Audi_A2_8Z.jpg",
  "A3": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvQVVESS9BMy1TUE9SVEJBQ0svNTEyOTJfQkVSTElORS1BLUhBWU9OLTUtUE9SVEVTL2EzLXNwb3J0YmFjay0wLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAyNCwiaGVpZ2h0IjpudWxsLCJmaXQiOiJjb3ZlciJ9fX0=",
  "A3 Sportback": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvQVVESS9BMy1TUE9SVEJBQ0svNTEyOTJfQkVSTElORS1BLUhBWU9OLTUtUE9SVEVTL2EzLXNwb3J0YmFjay0wLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAyNCwiaGVpZ2h0IjpudWxsLCJmaXQiOiJjb3ZlciJ9fX0=",
  "A4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd3HEb-jQangJpsemyZvjclpOxagxqKP4hGA&s",
  "A4 Allroad": "https://images.caradisiac.com/logos-ref/modele/modele--audi-a4-allroad-2e-generation/S0-modele--audi-a4-allroad-2e-generation.jpg",
  "A4 Avant": "https://www.topgear.com/sites/default/files/cars-car/image/2021/03/audiuk0002285520audi20a420avant.jpg",
  "A5": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvQVVESS9BNS81MTI5M19CRVJMSU5FLUEtSEFZT04tNS1QT1JURVMvYTUtMC5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEwMjQsImhlaWdodCI6bnVsbCwiZml0IjoiY292ZXIifX19",
  "A5 Sportback": "https://cms-assets.autoscout24.com/uaddx06iwzdz/1J9ZJzVmmq4AFEB7I3RJry/37b421066016ed2614a5b78b40b0eba7/audi-a5-sportback-l-01.jpg?w=1100",
  "A6": "https://images.ctfassets.net/uaddx06iwzdz/7aPSWTuHLGAcn6ps5BniGs/aa11e9bf7f6d7d89365f4481522eaa89/audi-a6-front.jpg",
  "A6 Allroad": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3gOAaYoXTQmFvTOGp91TbKXSmRFE-YDGQg&s",
  "A6 Avant": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvQVVESS9BNi81MTI5NV9CUkVBSy01LVBPUlRFUy9ub3V2ZWxsZS1hNi1hdmFudC0wLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAyNCwiaGVpZ2h0IjpudWxsLCJmaXQiOiJjb3ZlciJ9fX0=",
  "A7": "https://images.caradisiac.com/logos/3/6/1/1/243611/S0-nouvelle-audi-a7-prix-a-partir-de-74-000-eur-164908.jpg",
  "A8": "https://journalauto.com/wp-content/uploads/2022/05/Audi-AV.jpg",
  "A8 L": "https://cdn.schneider-chauffeur.de/app/uploads/2021/09/audi-a8-2021.jpg.webp",
  "Q2": "https://cdn.motor1.com/images/mgl/069rp/s1/audi-q2-edition-1.jpg",
  "Q3": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvQVVESS9RMy81MTI1NF9TVVYtVlAtNS1QT1JURVMvbm91dmVsbGUtcTMtMC5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEwMjQsImhlaWdodCI6bnVsbCwiZml0IjoiY292ZXIifX19",
  "Q3 Sportback": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80",
  "Q4 e-tron": "https://www.topgear-magazine.fr/wp-content/uploads/2023/09/Audi_Q4_9.jpg",
  "Q4 Sportback e-tron": "https://static.moniteurautomobile.be/imgcontrol/images_tmp/clients/moniteur/c1440-d720/content/medias/images/news/35000/0/20/audi_q4_e-tron__2_.jpg",
  "Q5": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvQVVESS9RNS81MTI2MF9TVVYtVlAtNS1QT1JURVMvbm91dmVsbGUtcTUtMC5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEwMjQsImhlaWdodCI6bnVsbCwiZml0IjoiY292ZXIifX19",
  "Q5 Sportback": "https://cdnwp.dealerk.com/650cb20d/uploads/sites/7/2021/10/audi-q5-sportback-2020-promo.jpg",
  "Q6": "https://cdn-datak.motork.net/configurator-imgs/cars/fr/800/AUDI/Q6-SPORTBACK-E-TRON/49038_SUV-5-DOORS/audi-q6-etron-sb-front-view.jpg",
  "Q7": "https://www.topgear.com/sites/default/files/2024/09/35964-AUDIQ72024DEANSMITH10.jpg",
  "Q8": "https://static.ncr.re/img/580x326/a6/a6a08081aab6809a6f43101c3d581bea.jpg",
  "Q8 e-tron": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvQVVESS9ROC1TUE9SVEJBQ0stRS1UUk9OLzUxMjc4X1NVVi1WUC01LVBPUlRFUy9xOC1zcG9ydGJhY2stZS10cm9uLTAuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMDI0LCJoZWlnaHQiOm51bGwsImZpdCI6ImNvdmVyIn19fQ==",
  "TT": "https://upload.wikimedia.org/wikipedia/commons/7/79/Audi_TTS_Coup%C3%A9_front_20100328.jpg",
  "TTS": "https://www.automoli.com/common/vehicles/_assets/img/gallery/f63/audi-tts-coupe-8s.jpg",
  "TT RS": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2020-audi-tt-rs-mmp-1-1638998586.jpg?crop=1.00xw:1.00xh;0,0&resize=640:*",
  "R8": "https://upload.wikimedia.org/wikipedia/commons/3/36/2015_Audi_R8_Coup%C3%A9_5.2_FSI_quattro_%2819409896583%29.jpg",
  "R8 Spyder": "https://pdlv.fr/wp-content/uploads/2022/07/fiche-technique-audi-r8-spyder-performance-2019.jpg",
  "RS3": "https://res.cloudinary.com/dsxfn6o4q/image/upload/c_fill,g_center,h_467,w_624/v1683882802/rzq8dpqwfff7tlzifbkg.jpg",
  "RS3 Sportback": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ZyL29yaWdpbmFsL0FVREkvUlMtMy1TUE9SVEJBQ0svNDg2MTlfSEFUQ0hCQUNLLTUtRE9PUlMvYXVkaS1yczMtc2ItZnJvbnQtdmlldy5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEwMjQsImhlaWdodCI6bnVsbCwiZml0IjoiY292ZXIifX19",
  "RS4 Avant": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZTznsVsTuyYkkyl3WMZuFP21Fri-QEAUxqg&s",
  "RS5": "https://i.ytimg.com/vi/-vOmRpnbFM4/maxresdefault.jpg",
  "RS5 Sportback": "https://cdn.motor1.com/images/mgl/AJYQO/s3/audi-rs5-sportback-by-abt.jpg",
  "RS6 Avant": "https://cdn.motor1.com/images/mgl/jboxl/s3/audi-rs6-avant-by-mansory-and-mtm.jpg",
  "RS7": "https://www.mansory.com/cdn-cgi/image/format=avif,quality=90/https://cdn.prod.website-files.com/661d6e0d2e84ef511db18f17/6818bd66e807a051a942382a_Audi%2520RS7-Exterior_-_Main_image-001.webp",
  "S3": "https://cdn.motor1.com/images/mgl/g4Mz48/s1/audi-s3-sportback-2024.jpg",
  "S4": "https://www.abt-sportsline.com/pim/documents/Bilder-Webseite/Audi/Headerbilder/Header_S4_8W0A.jpg",
  "S4 Avant": "https://www.simplicicar.com/10597247-large_default/audi-s4-avant-v6-30-tdi-341-tiptronic-8-quattro-garantie-12-mois-tva-recuperable.jpg",
  "S5": "https://upload.wikimedia.org/wikipedia/commons/7/7d/2018_Audi_S5_TFSi_Quattro_Automatic_3.0_Front.jpg",
  "S5 Sportback": "https://hips.hearstapps.com/hmg-prod/images/2021-audi-s5-sportback-mmp-1-1591045137.jpg?crop=0.782xw:0.781xh;0.0865xw,0.219xh&resize=1200:*",
  "S6": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Audi_S6_Avant_C8_IMG_4309.jpg/1280px-Audi_S6_Avant_C8_IMG_4309.jpg",
  "S7": "https://hips.hearstapps.com/hmg-prod/images/2022-audi-s7-mmp-1-1623860448.jpg?crop=0.952xw:0.803xh;0.0240xw,0.135xh&resize=1200:*",
  "S8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_qa2LnrXLbM2LIRJrsfkwK0pRmvr6Nc936g&s",
  "e-tron GT": "https://media.wired.com/photos/5bfdc1c6e80cd16006551353/master/w_1600%2Cc_limit/images-original-5118-EtronGT00000024-2.jpg",
  "RS e-tron GT": "https://cdn-datak.motork.net/configurator-imgs/cars/fr/800/AUDI/RS-E-TRON-GT/44713_BERLINE-4-PORTES/audi-rs-etron-gt-front-view.jpg",
};

const bmwModelImages = {
  "118i": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/2019_BMW_118i_SE_1.5_Front.jpg/1280px-2019_BMW_118i_SE_1.5_Front.jpg",
  "120i": "https://www.bowkermotorgroup.co.uk/wp-content/uploads/2024/07/BMW-1-Series-scaled.jpg",
  "120d": "https://images.caradisiac.com/logos/4/9/5/9/284959/S8-la-bmw-120d-n-est-pas-encore-has-been-211434.jpg",
  "125i": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo0JDCZwhaKvYDmgBW3OWBYUQysfp1q8nRoA&s",
  "128ti": "https://www.topgear.com/sites/default/files/cars-car/image/2021/02/p90413434_highres_1.jpg",
  "130i": "https://images.pistonheads.com/nimg/47725/mceu_59842171811696850736895.jpg",
  "M135i": "https://cdn.motor1.com/images/mgl/8Q2Wv/s1/2022-bmw-m135i-xdrive.webp",
  "218i": "https://images.caradisiac.com/logos/2/6/3/9/262639/S0-essai-bmw-218i-gran-coupe-2020-la-petite-grande-berline-en-habits-basiques-185643.jpg",
  "220i": "https://www.largus.fr/images/images/bmw-220i-2022-er-17.jpg",
  "220d": "https://www.goodwood.com/globalassets/.road--racing/road/test/2017/december/bmw-220d/bmw_220d_goodwood_test_11121705.jpg?rxy=0.5,0.5",
  "225i": "https://images.caradisiac.com/logos-ref/modele/modele--bmw-serie-2-f45-active-tourer/S8-modele--bmw-serie-2-f45-active-tourer.jpg",
  "230i": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&q=80",
  "M235i": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&q=80",
  "228i Gran Coupé": "https://hips.hearstapps.com/hmg-prod/images/2018-bmw-230i-8at-106-1538416490.jpg?crop=0.827xw:0.675xh;0.173xw,0.325xh&resize=1200:*",
  "316i": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVQ8op-trKeRTLftMeRXMeEkjapyGD9TDoeQ&s",
  "318i": "https://transforms.alialghanimsons.com.kw/production/files/vehicles/new/bmw/3-series/816417/gallery/BMW-3Series-318i-MSport-Gallery-1.png?w=800&h=418&q=82&auto=format&fit=crop&dm=1727774900&s=fa5f281e0e291643adb10d8ab13645d1",
  "320i": "https://africars.tz/assets/img/vehicles/bmw-320i-9cb44.png",
  "320d": "https://www.greencarguide.co.uk/wp-content/uploads/2019/08/BMW-320d-001-low-res.jpeg",
  "325i": "https://cdn.bmwblog.com/wp-content/uploads/2019/08/E30-BMW-M3-test-drive-95.jpg",
  "330i": "https://www.completecar.ie/img/testdrives/9951_large.jpg",
  "330e": "https://cdn.motor1.com/images/mgl/AEvg9/s1/2020-bmw-330e.jpg",
  "340i": "https://images.pistonheads.com/nimg/46223/blobid16.jpg",
  "M340i": "https://images.pistonheads.com/nimg/46223/blobid16.jpg",
  "M3": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvQk1XL00zLzUyMDAxX0JFUkxJTkUtNC1QT1JURVMvbTMtY29tcGV0aXRpb24tYmVybGluZS0wLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAyNCwiaGVpZ2h0IjpudWxsLCJmaXQiOiJjb3ZlciJ9fX0=",
  "M3 Competition": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvQk1XL00zLzUyMDAxX0JFUkxJTkUtNC1QT1JURVMvbTMtY29tcGV0aXRpb24tYmVybGluZS0wLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAyNCwiaGVpZ2h0IjpudWxsLCJmaXQiOiJjb3ZlciJ9fX0=",
  "420i": "https://www.challenges.fr/_ipx/f_webp&enlarge_true&fit_cover&s_1360x840/cha/static/s3fs-public/2022-01/dsc-0021-resultat-jpg.jpg%3FVersionId=g68fSGxTmCPtBA8UCuPDnyGiv4Y3cC5H",
  "430i": "https://mediapool.bmwgroup.com/cache/P9/202005/P90390041/P90390041-bmw-430i-coup-mineral-white-metallic-rim-19-y-spoke-06-2020-600px.jpg",
  "420d": "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400&q=80",
  "430d": "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400&q=80",
  "440i": "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400&q=80",
  "M440i": "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400&q=80",
  "M4": "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80",
  "M4 Competition": "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80",
  "418i Gran Coupé": "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400&q=80",
  "520i": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "523i": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "525i": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "530i": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "530e": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "540i": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "545e": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "550i": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "M550i": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "M5": "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80",
  "M5 Competition": "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80",
  "630i": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80",
  "640i": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80",
  "630d": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80",
  "640d": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80",
  "M635i": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80",
  "M6": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80",
  "640i Gran Turismo": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80",
  "730i": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&q=80",
  "740i": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&q=80",
  "740e": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&q=80",
  "750i": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&q=80",
  "M760i": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&q=80",
  "730d": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&q=80",
  "740d": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&q=80",
  "840i": "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&q=80",
  "850i": "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&q=80",
  "M840i": "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&q=80",
  "M8": "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&q=80",
  "M8 Gran Coupé": "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&q=80",
  "X1": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80",
  "X2": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80",
  "X2 M35i": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80",
  "X3": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=80",
  "X3 M": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=80",
  "X3 M40i": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=80",
  "X3 M Competition": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=80",
  "X4": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  "X4 M": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  "X4 M40i": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  "X4 M Competition": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  "X5": "https://images.unsplash.com/photo-1571987502227-9231b837d92a?w=400&q=80",
  "X5 M": "https://images.unsplash.com/photo-1571987502227-9231b837d92a?w=400&q=80",
  "X5 M50i": "https://images.unsplash.com/photo-1571987502227-9231b837d92a?w=400&q=80",
  "X5 M Competition": "https://images.unsplash.com/photo-1571987502227-9231b837d92a?w=400&q=80",
  "X6": "https://images.unsplash.com/photo-1616789916664-07b4f0beb8c6?w=400&q=80",
  "X6 M": "https://images.unsplash.com/photo-1616789916664-07b4f0beb8c6?w=400&q=80",
  "X6 M50i": "https://images.unsplash.com/photo-1616789916664-07b4f0beb8c6?w=400&q=80",
  "X6 M Competition": "https://images.unsplash.com/photo-1616789916664-07b4f0beb8c6?w=400&q=80",
  "X7": "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400&q=80",
  "X7 M60i": "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400&q=80",
  "Z4 sDrive20i": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
  "Z4 M40i": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
  "i3": "https://images.unsplash.com/photo-1617814065893-00757125efab?w=400&q=80",
  "i4 eDrive40": "https://images.unsplash.com/photo-1617814065893-00757125efab?w=400&q=80",
  "i4 M50": "https://images.unsplash.com/photo-1617814065893-00757125efab?w=400&q=80",
  "i5": "https://images.unsplash.com/photo-1617814065893-00757125efab?w=400&q=80",
  "i7": "https://images.unsplash.com/photo-1617814065893-00757125efab?w=400&q=80",
  "iX": "https://images.unsplash.com/photo-1617814065893-00757125efab?w=400&q=80",
  "iX1": "https://images.unsplash.com/photo-1617814065893-00757125efab?w=400&q=80",
  "iX3": "https://images.unsplash.com/photo-1617814065893-00757125efab?w=400&q=80",
  "iX M60": "https://images.unsplash.com/photo-1617814065893-00757125efab?w=400&q=80",
  "M2": "https://images.unsplash.com/photo-1629897048514-3dd7414fe72a?w=400&q=80",
  "M2 Competition": "https://images.unsplash.com/photo-1629897048514-3dd7414fe72a?w=400&q=80",
};

const volkswagenModelImages = {
  "Polo": "https://cdnwp.dealerk.com/7af55e26/uploads/sites/7/2024/08/volkswagen-polo-principale-e1723039658704.jpg",
  "Polo GTI": "https://cdn.motor1.com/images/mgl/3y91p/s1/4x3/2021-volkswagen-polo-gti-facelift.webp",
  "Golf": "https://cdnwp.dealerk.com/7af55e26/uploads/sites/3/2025/07/volkswagen-golf-7-banniere-1024x388.jpg",
  "Golf Plus": "https://sf1.autoplus.fr/wp-content/uploads/autoplus/2013/05/volkswagen-lance-golf-plus-life.jpg",
  "Golf Sportsvan": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYBv_7TrzU5EZ4pdM3FToLy58V5va3I1SZVA&s",
  "Golf Alltrack": "https://media.vw.com/assets/images/hero/8762-GSWA190784Digdesktop.jpg",
  "Golf GTI": "https://cdn.motor1.com/images/mgl/N7Gw9/s3/vw-golf-gti-clubsport-45.jpg",
  "Golf GTI Clubsport": "https://carfans.fr/wp-content/uploads/2025/07/Volkswagen-Golf-GTI-Clubsport-Mk8.5-final-review-15.webp",
  "Golf R": "https://media.ed.edmunds-media.com/volkswagen/golf-r/2026/oem/2026_volkswagen_golf-r_4dr-hatchback_base_fq_oem_1_600.jpg",
  "Golf GTE": "https://cdn.abcmoteur.fr/wp-content/uploads/2024/09/Volkswagen-Golf-8-GTE-2024-avant.jpg",
  "Golf Variant": "https://www.automoli.com/common/vehicles/_assets/img/gallery/f112/volkswagen-golf-vii-variant-facelift-2017.jpg",
  "Passat": "https://cdn.motor1.com/images/mgl/Ee2GN/s1/4x3/2019-vw-passat-variant-r-line-edition.webp",
  "Passat Alltrack": "https://www.largus.fr/images/photos/rsi/_G_JPG/Voitures/VOLKSWAGEN/Passat_Alltrack/VIII/Ph2/Break_5_portes/TROISQUARTAVANT.jpg",
  "Passat GTE": "https://images.caradisiac.com/logos/0/5/6/7/260567/S8-essai-volkswagen-passat-gte-2020-une-mise-a-jour-bien-legere-183410.jpg",
  "Passat Variant": "https://cms-assets.autoscout24.com/uaddx06iwzdz/2P1G674T2qrzYccTwtrNwz/0f7320eaaaccfacd8406b363c054e41e/vw-passat-l-01.jpg?w=1100",
  "Arteon": "https://cms-assets.autoscout24.com/uaddx06iwzdz/5VBAVXlXirPGMtH81ir7yt/e539756fa213c3bac3bfe27590a4978a/vw-arteon-l-01.jpg?w=1100",
  "Arteon Shooting Brake": "https://i.ytimg.com/vi/t7u8oKWXbyE/maxresdefault.jpg",
  "Arteon R": "https://cdn.motor1.com/images/mgl/RWK9e/s1/2020-vw-arteon-r-line-edition.jpg",
  "Tiguan": "https://www.topgear.com/sites/default/files/2024/04/Medium-36972-TiguanElegance.jpg",
  "Tiguan Allspace": "https://www.largus.fr/images/styles/max_1300x1300/public/images/volkswagen-tiguan-allspace-restyle-3.jpg?itok=_6cbXu8b",
  "Tiguan R": "https://www.chiptuning.com/media/wysiwyg/neuigkeiten/Fahrzeuge/PKW/VW/Tiguan_R_DTE_TechNews.jpg",
  "T-Roc": "https://images.caradisiac.com/logos/9/3/1/8/269318/S0-volkswagen-t-roc-restyle-prix-a-partir-de-27-990-eur-193265.jpg",
  "T-Roc R": "https://abcmoteur.fr/wp-content/uploads/2022/01/Volkswagen-T-Roc-R.jpg-2.webp",
  "T-Cross": "https://images.caradisiac.com/images/7/1/2/4/177124/S0-quel-suv-volkswagen-t-cross-choisir-595232.jpg",
  "Taigo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Volkswagen_Taigo_1X7A0350.jpg/1280px-Volkswagen_Taigo_1X7A0350.jpg",
  "Touareg": "https://cdn.motor1.com/images/mgl/GPJV1/s3/volkswagen-touareg-sondermodell-one-million.jpg",
  "Touareg R": "https://cdn.motor1.com/images/mgl/BMnJM/s1/2021-vw-touareg-r.jpg",
  "Touran": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREyTYRfo0cTevMgphBheErary0tWWmTv4p0Q&s",
  "Grand Touran": "https://www.largus.fr/images/styles/max_1300x1300/public/images/volkswagen-touran-2015-29.jpg?itok=2cpuNRWY",
  "Sharan": "https://www.topgear.com/sites/default/files/cars-car/image/2017/09/vw_7466_2.jpg",
  "Caddy": "https://images.ctfassets.net/uaddx06iwzdz/D8qjkwQVzk52HkdAzHJ76/da1dc8b262ddfb4f8f6058252b49c4a5/vw-caddy-l-01.jpg",
  "Caddy Maxi": "https://d2e5b8shawuel2.cloudfront.net/vehicle/293285/hrv/original.jpg",
  "ID.3": "https://www.automobile-propre.com/_next/image/?url=https%3A%2F%2Fcdn.automobile-propre.com%2Fuploads%2F2017%2F11%2FVolkswagen-ID.3-restyle%CC%81-2023-1.jpg&w=1920&q=75",
  "ID.4": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvVk9MS1NXQUdFTi9JRC00LzUxMzMyX1NVVi1WUC01LVBPUlRFUy9pZC00LTAuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMDI0LCJoZWlnaHQiOm51bGwsImZpdCI6ImNvdmVyIn19fQ==",
  "ID.4 GTX": "https://static.ncr.re/img/580x464/a0/a011f172d9f1ba7edec7066cc11510db.jpg",
  "ID.5": "https://im.qccdn.fr/node/actualite-volkswagen-id-5-premieres-impressions-101668/thumbnail_1000x600px-138542.jpg",
  "ID.5 GTX": "https://assets.volkswagen.com/is/image/volkswagenag/config-id-5-gtx?Zml0PWNyb3AsMSZmbXQ9cG5nJndpZD04MDAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmYzRiMA==",
  "ID.6": "https://www.largus.fr/images/images/vwid6profil.jpg",
  "ID.7": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Volkswagen_ID.7_IAA_2023_1X7A0375.jpg/1280px-Volkswagen_ID.7_IAA_2023_1X7A0375.jpg",
  "ID.7 Tourer": "https://cdn.automobile-propre.com/uploads/2024/02/Volkswagen-ID-7-Tourer-break-e%CC%81lectrique.jpg",
  "Phaeton": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/VW_Phaeton_3.0_V6_TDI_4MOTION_%282._Facelift%29_%E2%80%93_Frontansicht%2C_1._April_2012%2C_Essen.jpg/1280px-VW_Phaeton_3.0_V6_TDI_4MOTION_%282._Facelift%29_%E2%80%93_Frontansicht%2C_1._April_2012%2C_Essen.jpg",
  "Scirocco": "https://images.caradisiac.com/logos/8/0/8/2/128082/S0-Volkswagen-Scirocco-R-grosses-narines-et-petite-lunette-32037.jpg",
  "Eos": "https://upload.wikimedia.org/wikipedia/commons/4/4e/VW_Eos_front-3.JPG",
  "CC": "https://abcmoteur.fr/wp-content/uploads/2011/03/volkswagen-passat-cc-2011-tarifs.jpg",
  "up!": "https://im.qccdn.fr/node/actualite-volkswagen-up-premieres-impressions-11415/inline-15197.jpg",
  "e-up!": "https://ev-database.org/img/auto/Volkswagen_e-Up-2019/Volkswagen_e-Up-2019-01@2x.jpg",
};

const seatModelImages = {
  "Ibiza": "https://static.ncr.re/img/1200x750/ed/ed791547672ded1ed96560d42e734165.jpg",
  "Ibiza FR": "https://i.bstr.es/highmotor/2025/01/IMG_9093photo-2-scaled-e1736247166440-1280x756.jpg",
  "León": "https://images.caradisiac.com/logos/9/2/9/4/259294/S0-seat-leon-4-2020-prix-a-partir-de-21-370-eur-181936.jpg",
  "León ST": "https://images.caradisiac.com/logos-ref/modele/modele--seat-leon-4-st/S0-modele--seat-leon-4-st.jpg",
  "León FR": "https://images.tec3h.com/originale/479/43224572.jpeg",
  "León Cupra": "https://images.caradisiac.com/logos/1/4/1/6/241416/S0-salon-de-francfort-2017-seat-leon-cupra-r-encore-un-peu-plus-162440.jpg",
  "León e-Hybrid": "https://www.canalauto.fr/images/700x0/UserFiles/Image/canalauto/Seat/Seat_leon_(1).png",
  "León Sportstourer": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvU0VBVC9MRU9OLzUxMjMwX0JSRUFLLTUtUE9SVEVTL2xlb24tc3BvcnRzdG91cmVyLTAuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMDI0LCJoZWlnaHQiOm51bGwsImZpdCI6ImNvdmVyIn19fQ==",
  "Arona": "https://images.caradisiac.com/logos/2/0/4/0/242040/S0-seat-arona-prix-a-partir-de-16-500-eur-163059.jpg",
  "Arona FR": "https://static.autohaus-tabor.de/public/images/cars/fr/150121479_full_01.jpg",
  "Ateca": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvU0VBVC9BVEVDQS81MTIyNl9TVVYtVlAtNS1QT1JURVMvYXRlY2EtMC5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEwMjQsImhlaWdodCI6bnVsbCwiZml0IjoiY292ZXIifX19",
  "Ateca FR": "https://images.ctfassets.net/8tpbxzn2rg50/gspCB4TxphewAInAoJV7O/0b4f7a0470c62d396d7a713e1cd71f1b/Seat_Ateca_FR_001-min.jpg?w=1200&h=800&q=75&fit=thumb&f=center",
  "Tarraco": "https://cms-assets.autoscout24.com/uaddx06iwzdz/2Pdrvv4qMvQnZTzuhzzqix/26c5248a12868d182f46dd9ac434026c/seat-tarraco-front.jpg?w=1100",
  "Tarraco FR": "https://www.seat.lu/content/dam/public/seat-website/company/news-and-events/company/new-seat-tarraco-fr-phev-showcar/multimedia-gallery-1/new-seat-tarraco-fr-phev-01.jpg",
  "Alhambra": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1pq9sLF5dhHYpoN38eABPtZJFq0n6Vfwu7A&s",
  "Mii": "https://images.caradisiac.com/logos/6/9/3/2/256932/S8-fiabilite-de-la-seat-mii-la-maxi-fiche-occasion-de-caradisiac-179314.jpg",
  "Toledo": "https://www.automoli.com/common/vehicles/_assets/img/gallery/f100/seat-toledo-iii-5p.jpg",
  "Exeo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWvjsO1QY6g8F1iHqyMeElSVqbUlICdEvlmg&s",
  "Altea": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/2007_SEAT_Altea_Reference_TDi_1.9_Front.jpg/1280px-2007_SEAT_Altea_Reference_TDi_1.9_Front.jpg",
  "Altea XL": "https://parkers-images.bauersecure.com/wp-images/21441/cut-out/seat_altea_xl.jpg",
  "Altea Freetrack": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Seat_Altea_Freetrack_4x4_Candywei%C3%9F.JPG",
  "Cupra Formentor": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvQ1VQUkEvRk9STUVOVE9SLzUxMzg2X1NVVi1WUC01LVBPUlRFUy9mb3JtZW50b3ItMC5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEwMjQsImhlaWdodCI6bnVsbCwiZml0IjoiY292ZXIifX19",
  "Cupra Formentor VZ": "https://www.turbo.fr/sites/default/files/2021-10/16%20Essai%20Cupra%20Formentor%20VZ5%202021.jpg",
  "Cupra Born": "https://cupra-be.imgix.net/_sb-assets/f/142628/1920x1080/c64e0f552a/n7n7_cb2.png?auto=format&fit=max&w=3840&q=20",
  "Cupra Ateca": "https://www.cupraofficial.fr/content/dam/public/cupra-website/cars/born/two-columns/cupra-born-aurora-blue-colour-with-thunderstorms-wheels.jpg",
  "Cupra León": "https://images.caradisiac.com/logos-ref/modele/modele--cupra-leon/S0-modele--cupra-leon.jpg",
  "Cupra León Sportstourer": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpokBv8EGQIDMEZDupGGZcWphp6NKq9KvaQw&s",
  "Cupra Terramar": "https://www.cupraofficial.fr/content/dam/public/cupra-website/cars/terramar/cc-lite/Q5Q5_CF6.png",
};

const peugeotModelImages = {
  "106": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6viYP9qWXyARXQrTXGT-xfhTViorvQ1YooA&s",
  "107": "https://img-4.linternaute.com/IUsEBNCmSS_lVPnYhqiYQODIXTo=/620x414/smart/8516399ab2df4af3b74ddb550fa44da9/ccmcms-linternaute/1093781.jpg",
  "108": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/17-08-05-Island-Auto-RalfR-DSC_2520.jpg/1280px-17-08-05-Island-Auto-RalfR-DSC_2520.jpg",
  "205": "https://upload.wikimedia.org/wikipedia/commons/5/55/Peugeot_205_front_20080121.jpg",
  "206": "https://images.caradisiac.com/logos/0/3/7/5/250375/S0-la-peugeot-206-en-occasion-les-meilleures-et-les-pires-versions-172067.jpg",
  "207": "https://images.caradisiac.com/logos-ref/modele/modele--peugeot-207/S0-modele--peugeot-207.jpg",
  "208": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/2017_Peugeot_208_Active_1.2_facelift_Front.jpg/1280px-2017_Peugeot_208_Active_1.2_facelift_Front.jpg",
  "208 GT": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB0iF2gRkNcwFRZZHYvmGyAAF6JJydHUbsUA&s",
  "208 GTi": "https://journalauto.com/wp-content/uploads/2025/06/peugeot-e208-GTi.jpg",
  "301": "https://www.largus.fr/images/styles/max_1300x1300/public/images/nouvelle-peugeot-301-2017-1.jpg?itok=-_UM-1gC",
  "305": "https://i.ytimg.com/vi/r4Sj9M61_qE/maxresdefault.jpg",
  "306": "https://medias.agenda-automobile.com/2023/09/Peugeot-306-berline-4-portes-1998.jpg",
  "307": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIwyHm4LzT4ncl36KdVVCDgKR6oWtdHPu8sw&s",
  "308": "https://journalauto.com/wp-content/uploads/2021/09/308-AV1.jpg",
  "308 SW": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvUEVVR0VPVC8zMDgvNTExNTZfQlJFQUstNS1QT1JURVMvbm91dmVsbGUtMzA4LXN3LTAuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMDI0LCJoZWlnaHQiOm51bGwsImZpdCI6ImNvdmVyIn19fQ==",
  "308 GT": "https://www.autojm.fr/blog/wp-content/uploads/2022/10/313.jpg",
  "308 GTi": "https://www.viinz.com/wp-content/uploads/2016/03/essai-peugeot-308-gti-sport-exterieur-67.jpg",
  "405": "https://carjager-dev.mo.cloudinary.net/https://public.carjager.com/production/cms/PEUG_scaled_a3fc60cf67.jpeg?tx=w_768",
  "406": "https://p.turbosquid.com/ts-thumb/JY/kIQly9/J3/406697/jpg/1740933176/600x600/fit_q87/6129122dee335a6b4b46b63a26e688af22721a1c/406697.jpg",
  "407": "https://www.largus.fr/images/styles/max_1300x1300/public/2024-08/peugeot-407-1-rouge-statique-campagne-1-avant-droit-88-bd.jpg?itok=4wqdI-b9",
  "408": "https://www.largus.fr/images/styles/max_1300x1300/public/2024-10/peugeot-e-408-2024-blanc-avd-mk.jpg?itok=tNR-SUdZ",
  "508": "https://im.qccdn.fr/node/actualite-peugeot-508-2023-premieres-impressions-114830/thumbnail_800x480px-128942.jpg",
  "508 SW": "https://cdn.motor1.com/images/mgl/88Nno/s1/peugeot-508-sw-pse-2020.jpg",
  "508 PSE": "https://cdn.motor1.com/images/mgl/88Nno/s1/peugeot-508-sw-pse-2020.webp",
  "508 RXH": "https://abcmoteur.fr/wp-content/uploads/2012/02/peugeot-508-rxh-2012.jpg",
  "2008": "https://www.topgear.com/sites/default/files/2023/10/2008_UK_2023_EXT3.jpg",
  "3008": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvUEVVR0VPVC8zMDA4LzUxOTI0X1NVVi1WUC01LVBPUlRFUy8zMDA4LTAuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMDI0LCJoZWlnaHQiOm51bGwsImZpdCI6ImNvdmVyIn19fQ==",
  "3008 GT": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMYtWrmzf07wuy-V6NV6Hb-K-JOOQI0ZFCng&s",
  "4007": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Peugeot_4007_HDi_FAP_155_Platinum_%E2%80%93_Frontansicht%2C_15._Juni_2011%2C_W%C3%BClfrath.jpg",
  "4008": "https://www.ziptuning.fr/wp-content/uploads/2022/03/4008-696x392.jpg",
  "5008": "https://www.topgear.com/sites/default/files/cars-car/image/2024/11/Hybrid5008_2024_EXT27.jpg",
  "5008 GT": "https://images.caradisiac.com/logos/6/5/0/9/196509/S8-essai-peugeot-5008-gt-2017-la-famille-en-or-113942.jpg",
  "Rifter": "https://www.peugeot.fr/content/dam/peugeot/master/b2c/our-range/showroom/rifter/2024-12-rifter-december-window/mobile/TRIM_E_ALLURE_M.jpg?imwidth=768",
  "Traveller": "https://www.largus.fr/images/styles/max_1300x1300/public/images/peugeot-e-traveller-7.jpg?itok=D7jMFjsT",
  "Expert": "https://d2e5b8shawuel2.cloudfront.net/vehicle/311180/hrv/original.jpg",
  "Partner": "https://d2e5b8shawuel2.cloudfront.net/vehicle/297650/hrv/original.jpg",
  "Partner Tepee": "https://www.automobile-propre.com/_next/image/?url=https%3A%2F%2Fcdn.automobile-propre.com%2Fuploads%2F2017%2F02%2Fpeugeot-partner-tepee-electric.jpg&w=1920&q=75",
  "Bipper": "https://images.caradisiac.com/logos-ref/modele/modele--peugeot-bipper/S0-modele--peugeot-bipper.jpg",
  "Boxer": "https://d2e5b8shawuel2.cloudfront.net/vehicle/313020/hrv/original.jpg",
  "RCZ": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJk-7_aY5-DdOp1rQWPck15D_1L-dixH4d5A&s",
  "iOn": "https://cdn-s-www.lalsace.fr/images/5a4422dd-37b3-4c34-b3ef-a4acc4a31c61/NW_raw/avec-la-ion-peugeot-veut-prendre-renault-de-court-1677231334.jpg",
  "e-208": "https://voldt.fr/cdn/shop/collections/Tesla_Models_79150408-7188-45fe-9e3d-b02701ebc0de.webp?v=1686041619",
  "e-2008": "https://static.moniteurautomobile.be/imgcontrol/images_tmp/clients/moniteur/c680-d465/content/medias/images/news/41000/900/10/2023_peugeot_2008_05.jpg",
  "e-308": "https://images.caradisiac.com/logos/8/3/8/3/278383/S8-essai-peugeot-e-308-2023-a-peine-arrivee-deja-depassee-la-308-electrique-203862.jpg",
  "e-3008": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvUEVVR0VPVC9FLTMwMDgvNTE5MjJfU1VWLVZQLTUtUE9SVEVTL2UtMzAwOC0wLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAyNCwiaGVpZ2h0IjpudWxsLCJmaXQiOiJjb3ZlciJ9fX0=",
  "e-5008": "https://static.moniteurautomobile.be/imgcontrol/images_tmp/clients/moniteur/c680-d465/content/medias/images/test_drives/11000/500/50/peugeote5008-1jpg.jpg",
};

const citroenModelImages = {
  "C1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPtmSye5_Ix6Nce0GEjujcrX-CB9XBpkLKYQ&s",
  "C2": "https://images.ctfassets.net/uaddx06iwzdz/2EmR3Z6qTpbfN6i4GXNhau/70b90d1215ffe44038f4929208d7ff65/citroen-c2-l-01.jpg",
  "C3": "https://cdn-s-www.leprogres.fr/images/ACB7A383-1256-43F7-89BC-3796D9823B54/MF_contenu/citroen-c3-d-occasion-laquelle-choisir-1627978544.jpg",
  "C3 Pluriel": "https://images.caradisiac.com/logos-ref/modele/modele--citroen-c3-pluriel/S0-modele--citroen-c3-pluriel.jpg",
  "C3 Picasso": "https://sf2.autojournal.fr/wp-content/uploads/autojournal/2020/06/citroen_c3_picasso_2012_b6284-750x410.jpg",
  "C3 Aircross": "https://www.wizicar.com/wp-content/uploads/2018/10/citroen-c3-aircross-1024x637.jpg",
  "C4": "https://cdn.motor1.com/images/mgl/MpK7X/s3/citroen-c4.jpg",
  "C4 Cactus": "https://www.ecoreseau.fr/wp-content/uploads/2018/06/Citroen.jpg",
  "C4 X": "https://static.autohaus-tabor.de/public/images/cars/fr/143940733_full_01.jpg",
  "C4 Picasso": "https://images.caradisiac.com/images/4/3/1/8/94318/S0-Quelle-Citroen-C4-Picasso-choisir-320790.jpg",
  "C4 SpaceTourer": "https://images.caradisiac.com/logos-ref/modele/modele--citroen-c4-spacetourer/S0-modele--citroen-c4-spacetourer.jpg",
  "C4 Grand Picasso": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGnYoTs4dCCJ2UrAsgf0acOxBQqlPTkv5nDA&s",
  "Grand C4 Picasso": "https://www.turbo.fr/sites/default/files/migration/test/field_image/000000004174906.jpg",
  "Grand C4 SpaceTourer": "https://images.caradisiac.com/logos-ref/modele/modele--citroen-grand-c4-spacetourer/S0-modele--citroen-grand-c4-spacetourer.jpg",
  "C5": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Citro%C3%ABn_C5_II_front-1.JPG",
  "C5 Tourer": "https://cdn.motor1.com/images/mgl/Ey6LM/s1/essai-citroen-c5-tourer.jpg",
  "C5 Aircross": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvQ0lUUk9FTi9DNS1BSVJDUk9TUy81MTEzN19TVVYtVlAtNS1QT1JURVMvbm91dmVhdS1jNS1haXJjcm9zcy0wLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAyNCwiaGVpZ2h0IjpudWxsLCJmaXQiOiJjb3ZlciJ9fX0=",
  "C5 X": "https://im.qccdn.fr/node/actualite-citroen-c5-x-premieres-impressions-99096/thumbnail_800x480px-138438.jpg",
  "C6": "https://images.caradisiac.com/logos-ref/modele/modele--citroen-c6/S0-modele--citroen-c6.jpg",
  "C8": "https://images.caradisiac.com/logos-ref/modele/modele--citroen-c8/S0-modele--citroen-c8.jpg",
  "Berlingo": "https://s3-api.groupejmj.com/media/images/CL_23.030.037.2e16d0ba.fill-1140x783.jpg",
  "Berlingo Multispace": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiy-vJIlUrKsPnXEdX1QfDRUibLLIQKYfvgw&s",
  "SpaceTourer": "https://www.auto-infos.fr/mediatheque/4/1/5/000159514_600x400_c.jpg",
  "Jumpy": "https://cdn.automobile-propre.com/uploads/2020/05/citroen-e-jumpy-electrique-2020-03.jpg",
  "Jumper": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOCm4Q2hQMf9OIVnLXmcot-AKRFCq0j4YyKQ&s",
  "DS3": "https://static.moniteurautomobile.be/imgcontrol/images_tmp/clients/moniteur/c680-d465/content/medias/images/news/5000/0/60/NEWS_5061_1.jpg",
  "DS3 Crossback": "https://www.largus.fr/images/styles/max_1300x1300/public/images/ds3-crossback-illu.jpg?itok=VU_x_G4c",
  "DS4": "https://photos.auto-moto.com/32/2015/12/photo_article/2160/16381/1200-L-citron-ds4-avis-fiabilit-problmes-rappels-contrle-technique.webp",
  "DS4 Crossback": "https://www.autojm.fr/blog/wp-content/uploads/2023/07/DS4-Crossback.jpg",
  "DS5": "https://www.challenges.fr/_ipx/f_webp&enlarge_true&fit_cover&s_1360x840/cha/static/s3fs-public/2016-03/ds5.jpg%3FVersionId=KRAVUO18zPy34MyKOd7TwFGAViU3wvxb",
  "DS7 Crossback": "https://www.challenges.fr/_ipx/f_webp&enlarge_true&fit_cover&s_1360x840/cha/static/s3fs-public/2018-11/585-dit-faitds-7-crossback.jpg%3FVersionId=RWCVzPahTc_pGrLYnNlEx7zJgx_F9.t2",
  "DS9": "https://img-4.linternaute.com/xdcQbLtA6izy_Rt4soHZXArJeSs=/1500x/smart/ac86a30a8f64477aa32ba5d7aeb3f9a9/ccmcms-linternaute/14118926.jpg",
  "ë-C4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUvZwYSMtmIfBOuYwzmiqSrQusL4KA1nFAWg&s",
  "ë-C4 X": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkeUn13LSZLIiGALA2e6oSLqgnYow_Yqjwgw&s",
  "ë-Berlingo": "https://cdn.automobile-propre.com/uploads/2015/12/Citroen-e-Berlingo-Van-electrique-2021-avant-recharge.jpg",
  "ë-SpaceTourer": "https://www.media.stellantis.com/cache/2/f/6/4/8/2f648af3fd7f314b8f641b6709dea75ecd64badc.jpeg",
  "C-Zero": "https://images.caradisiac.com/logos-ref/modele/modele--citroen-c-zero/S0-modele--citroen-c-zero.jpg",
  "C-Elysée": "https://images.caradisiac.com/logos-ref/modele/modele--citroen-c-elysee/S0-modele--citroen-c-elysee.jpg",
  "Xantia": "https://images.caradisiac.com/logos/5/6/2/0/135620/S8-Citroen-Xantia-40154.jpg",
  "Xsara": "https://images.caradisiac.com/logos/5/6/2/1/135621/S8-Citroen-Xsara-40155.jpg",
  "Xsara Picasso": "https://images.caradisiac.com/logos-ref/modele/modele--citroen-xsara-picasso/S0-modele--citroen-xsara-picasso.jpg",
  "ZX": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgUzb5oR7Dc8ETGhDNvoLl4hLTF8NSU5u1ug&s",
  "Saxo": "https://images.ctfassets.net/uaddx06iwzdz/1foZdDaI5MeCUjKspaonQo/331125b60fdcb9d457cd37154feff29a/citroen-saxo-l-01.jpg",
};

const renaultModelImages = {
  "Twingo": "https://media.ouest-france.fr/v1/pictures/MjAyNjAzZGJkMjlhNWZkNzlmYWM1NzJlMGVhYmY4MzhmM2QyZDI?width=1260&height=708&focuspoint=50%2C25&cropresize=1&client_id=bpeditorial&sign=6d8584da2578b5a448829684def3f055b2b26d7b538928d7ea813cdaa25cd1da",
  "Twingo RS": "https://images.caradisiac.com/images/9/8/8/1/179881/S1-renault-twingo-ii-rs-2008-2013-une-super-sportive-des-4-500-eur-611579.jpg",
  "Clio": "https://www.caroom.fr/blog/wp-content/uploads/2025/10/renault-clio.jpg",
  "Clio RS": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC2nmaOu2_9tjYJsgi3m8mQB13xrL0g_EZfQ&s",
  "Clio RS Trophy": "https://cdn.motor1.com/images/mgl/xJrXy/s1/4x3/renaul-clio-4-rs-trophy.webp",
  "Clio E-Tech": "https://cdn.automobile-propre.com/uploads/2019/12/renault-clio-e-tech-hybride-2020-01.jpg",
  "Mégane": "https://cdn.group.renault.com/ren/fr/test-sprint-114/test-sprint-small-2560x1440.jpg.ximg.xsmall.jpg/7ed9f63da6.jpg",
  "Mégane RS": "https://challenges.fr/static/s3fs-public/2018-01/renault-megane-r-s-chassis-cup-dynamic-10.JPG?VersionId=uAEEM4vHgUqGRsfuYfpowUDjvS3UUCku",
  "Mégane RS Trophy": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFV23qPm1Zme6yvYB_yrh0MhZb-JG79QEBsw&s",
  "Mégane E-Tech": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFKORzPjIjmI6NzCiESYb7q10FJYuBsCRgKQ&s",
  "Mégane Grandtour": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSklCj5VNMv7rQyhuUC4VwlQOhMD2u58_JwLg&s",
  "Laguna": "https://images.caradisiac.com/logos-ref/modele/modele--renault-laguna-3/S7-modele--renault-laguna-3.jpg",
  "Laguna Coupé": "https://images.caradisiac.com/logos/5/1/8/7/175187/S8-Essai-Renault-Laguna-Coupe-dCi-110-EDC-l-ouvriere-en-robe-de-soiree-90474.jpg",
  "Laguna GT": "https://images.caradisiac.com/images/9/1/2/0/199120/S1-renault-laguna-iii-2-0t-gt-4control-2008-2010-un-chassis-surrealiste-des-6-800-eur-734914.jpg",
  "Talisman": "https://cdn.motor1.com/images/mgl/4MReq/s3/renault-talisman-restyling-2020.jpg",
  "Talisman Estate": "https://cdn.group.renault.com/ren/fr/pro/visuels-homepage-avec-picto/austral_desktop_2560_1440.jpg.ximg.xsmall.jpg/315106891a.jpg",
  "Fluence": "https://images.caradisiac.com/logos-ref/modele/modele--renault-fluence/S7-modele--renault-fluence.jpg",
  "Kangoo": "https://d2e5b8shawuel2.cloudfront.net/vehicle/283674/hrv/original.jpg",
  "Kangoo E-Tech": "https://www.batiactu.com/images/auto/1200-900-m/20221025_120910_2022-nouveau-renault-kangoo-van-e-tech-electric.jpeg",
  "Scénic": "https://images.caradisiac.com/logos/8/9/9/9/248999/S0-le-renault-scenic-3-en-occasion-les-meilleures-et-pires-versions-170761.jpg",
  "Grand Scénic": "https://blog.vivacar.fr/wp-content/uploads/2022/11/Renault_Grand_Scenic_finition_evolution.webp",
  "Scénic E-Tech": "https://journalauto.com/wp-content/uploads/2024/03/SC.jpg",
  "Espace": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvUkVOQVVMVC9FU1BBQ0UvNTE0NDlfQ1JPU1NPVkVSLTUtUE9SVEVTL25vdXZlYXUtZXNwYWNlLTAuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMDI0LCJoZWlnaHQiOm51bGwsImZpdCI6ImNvdmVyIn19fQ==",
  "Grand Espace": "https://www.latribuneauto.com/media/cache/resolve/vehicule_slider/photos/RENAULT/Grand%20Espace/RENA-GRAE-MO-10-28815/Renault-Grand%20Espace-Monospace-Familial-Copyright-Renault-1.jpg",
  "Captur": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvUkVOQVVMVC9DQVBUVVIvNTE5ODhfU1VWLVZQLTUtUE9SVEVTL2NhcHR1ci0wLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAyNCwiaGVpZ2h0IjpudWxsLCJmaXQiOiJjb3ZlciJ9fX0=",
  "Captur E-Tech": "https://images.caradisiac.com/logos/9/2/8/5/259285/S0-renault-captur-e-tech-hybride-rechargeable-ce-qu-il-faut-savoir-technique-prix-concurrence-181924.jpg",
  "Kadjar": "https://dd-tuning.fr/assets/galleries/47042/594/555zq.jpg",
  "Koleos": "https://cdn.motor1.com/images/mgl/MnRvE/s1/4x3/essai-renault-koleos-2017.webp",
  "Arkana": "https://www.challenges.fr/_ipx/f_webp&enlarge_true&fit_cover&s_1360x840/cha/static/s3fs-public/2024-04/4111-hr.jpg%3FVersionId=9IeE.qhiM8Ee.PxbkFgjKgDth.qc_aqE",
  "Austral": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvUkVOQVVMVC9BVVNUUkFMLzUxNDQ2X1NVVi1WUC01LVBPUlRFUy9ub3V2ZWF1LWF1c3RyYWwtMC5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEwMjQsImhlaWdodCI6bnVsbCwiZml0IjoiY292ZXIifX19",
  "Austral E-Tech": "https://www.automobile-propre.com/wp-content/uploads/2021/12/renault-austral-hybride-0013-1200x800.jpg",
  "Symbioz": "https://cdn.motor1.com/images/mgl/P30kly/s3/renault-symbioz-2024.jpg",
  "Zoe": "https://cdn.motor1.com/images/mgl/W3Jx1/s3/2020-renault-zoe.jpg",
  "Vel Satis": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Renault_Vel_Satis_3.0_dCi_V6_%E2%80%93_Frontansicht%2C_5._Mai_2012%2C_Ratingen.jpg/1280px-Renault_Vel_Satis_3.0_dCi_V6_%E2%80%93_Frontansicht%2C_5._Mai_2012%2C_Ratingen.jpg",
  "Safrane": "https://images.caradisiac.com/logos-ref/modele/modele--renault-safrane/S0-modele--renault-safrane.jpg",
  "Master": "https://d2e5b8shawuel2.cloudfront.net/vehicle/305484/hrv/original.jpg",
  "Trafic": "https://cdn-datak.motork.net/configurator-imgs/trucks/fr/800/RENAULT/TRAFIC-E-TECH/8795_FOURGON-TOLE-4-PORTES/renault-trafic-van-etech-front-view.jpg",
  "Alaskan": "https://motorsactu.com/wp-content/uploads/2020/04/Renault-ALASKAN-36.jpg",
  "Latitude": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzv5Nv2zgtRD2_J_EOF46jJmr9Ps4ZJobIYg&s",
};

const porscheModelImages = {
  "911 Carrera": "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2024/Products/992-II/0840_nevada_coupe_u-crane_AKOS0607_edit_V03-sky.jpg/jcr:content/0840_nevada_coupe_u-crane_AKOS0607_edit_V03-sky.jpg",
  "911 Carrera S": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7jlVa_4y8cHk66Cppw_pjJQ5BTWEiMdB0kA&s",
  "911 Carrera 4": "https://www.completecar.ie/img/testdrives/13473_large.jpg",
  "911 Carrera 4S": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcLQLtO4ziFbwg54s_XSo4J1zUxkX_n4csjA&s",
  "911 Carrera T": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQILyFeewveYnqHbo_joJO192zVWXxUMqwAhw&s",
  "911 Targa 4": "https://www.gallery-aaldering.com/wp-content/uploads/2024/03/porsche-991-targa-4-gts-2017.jpg",
  "911 Targa 4S": "https://cdn.motor1.com/images/mgl/86ByP/s1/911-targa-4s-exclusive-design-edition.jpg",
  "911 Targa 4 GTS": "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1741107687/evo/2025/02%20Feb/Porsche%20911%20Targa%204%20GTS%20992.2%20review-5.jpg",
  "911 Turbo": "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ijsxlvQB.bu8/v0/-1x-1.webp",
  "911 Turbo S": "https://a.storyblok.com/f/322327/5760x2850/487d3ceaf7/cz26w11ox0001-911-turbo-s-cabrio-side-desktop.jpg/m/2560x1440/smart/filters:format(webp)?dpl=dpl_G86bViAJTFcXwTrnmbN7qKVBRY6G",
  "911 GT3": "https://cdn.prod.website-files.com/63fe11299d35c575d57a5632/68f92319f16cf56da733c023_Porsche-911-991.2-GT3.webp",
  "911 GT3 RS": "https://images.caradisiac.com/logos/2/6/4/1/272641/S0-porsche-911-gt3-rs-17-aout-presentation-de-la-nouvelle-generation-197306.jpg",
  "911 GT3 Touring": "https://images.pistonheads.com/nimg/45281/DSCF6353-Edit.jpg",
  "911 GT2 RS": "https://911andco.fr/wp-content/uploads/2017/07/fiche-technique-porsche-911-991-GT2-RS-18.jpg",
  "911 GTS": "https://porschepictures.flowcenter.de/pmdb/thumbnail.cgi?id=283834&w=1935&h=1089&crop=1&public=1&cs=b37c8f21d71d9f4a",
  "911 Dakar": "https://carwow-uk-wp-1.imgix.net/porsche-911-dakar-rally-design-pack-front-4.jpg?auto=format&cs=tinysrgb&fit=crop&h=800&ixlib=rb-1.1.0&q=60&w=1600",
  "911 Sport Classic": "https://cdn.motor1.com/images/mgl/400Zl1/s1/2023-porsche-911-sport-classic-exterior-view.jpg",
  "718 Boxster": "https://www.annonces-automobile.com/images/data/actualite/main/111177.jpg",
  "718 Boxster S": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD7XNZ_Wf9GicGBBBOFjxhudsWsMM6pFmTwA&s",
  "718 Boxster GTS": "https://pictures.porsche.com/rtt/iris?COSY-EU-100-1711coMvsi60AAt5FwcmBEgA4qP8iBUDxPE3Cb9pNXkBuNYdMGF4tl3U0%25z8rMHIspbWvanYb%255y%25oq%25vSTmjMXD4qAZeoNBPUSfUx4RmHlCgI7Zl2dioCx3hQDcFG87XYnfurnfeV6iTWXIzhRc21Gf8dXFikXPE3pUWFYRpwY4EhMyKx7Jv5mb3%25ZpjsT",
  "718 Boxster Spyder": "https://images.caradisiac.com/images/1/8/5/7/101857/S1-Salon-de-New-York-voici-le-Porsche-Boxster-Spyder-349837.jpg",
  "718 Cayman": "https://hips.hearstapps.com/hmg-prod/images/2025-porsche-718-cayman-101-66f6f7b824e6d.jpg?crop=0.541xw:0.406xh;0.264xw,0.233xh&resize=640:*",
  "718 Cayman S": "https://www.speedstar.fr/wp-content/uploads/2022/10/718CYB1.jpg",
  "718 Cayman GTS": "https://www.forbes.fr/wp-content/uploads/2021/06/porsche-870x580.jpeg",
  "718 Cayman GT4": "https://www.annonces-automobile.com/images/data/actualite/main/111388.jpg",
  "718 Cayman GT4 RS": "https://photos.auto-moto.com/32/2021/11/photo_article/11200/91609/1200-L-porsche-718-cayman-gt4-rs-2022-prix-infos-et-photos-officielles.webp",
  "718 Spyder RS": "https://cdn.motor1.com/images/mgl/Rq9YlA/s1/porsche-718-spyder-rs.webp",
  "Cayenne": "https://cdn.motor1.com/images/mgl/y2PgRq/s1/2024-porsche-cayenne.jpg",
  "Cayenne S": "https://images-porsche.imgix.net/-/media/A1F131A787D84B80BA7C85A90CA83246_6E5232CEA9DE4C8DA7E98A3309D0B259_CY24J5BOX0003-pasm?w=1759&q=85&auto=format",
  "Cayenne GTS": "https://images.caradisiac.com/logos/2/4/5/1/282451/S0-le-nouveau-porsche-cayenne-gts-2024-n-a-aucune-chance-en-france-208414.jpg",
  "Cayenne Turbo": "https://carfans.fr/wp-content/uploads/2023/08/Porsche-Cayenne-Turbo-E-Hybrid-2023-3.jpeg.webp",
  "Cayenne Turbo S": "https://www.gaillardauto.com/content/uploads/2023/10/img_e5e57e895c4f-1.jpeg",
  "Cayenne E-Hybrid": "https://cdn.automobile-propre.com/cdn-cgi/image/width=3840,format=auto,fit=scale-down/https://cdn.automobile-propre.com/uploads/2023/05/Porsche-Cayenne-E-Hybrid-2023-1-1200x800.jpg",
  "Cayenne Turbo E-Hybrid": "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1722252514/autoexpress/2024/07/Porsche%20Cayenne%20Turbo%20E-Hybrid%20with%20GT%20Package%202024-22.jpg",
  "Cayenne Coupé": "https://upload.wikimedia.org/wikipedia/commons/5/54/Porsche_Cayenne_Coup%C3%A9_S_Solitude_Revival_2019_IMG_1599.jpg",
  "Cayenne Turbo Coupé": "https://images-porsche.imgix.net/-/media/66332A6C447C474F817B23C66D6D906A_F6DDA391813D4885AC56E90EB7BE5612_CY25J5QOX0005-cayenne-turbo-e-hybrid-coupe-driving?w=1759&q=85&auto=format",
  "Macan": "https://cdn.motor1.com/images/mgl/pbYN0P/s3/porsche-macan-rwd-2024.jpg",
  "Macan S": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxf6PR5M_adssvVF289yEZN2fzr4Ne0T5reA&s",
  "Macan GTS": "https://res.cloudinary.com/dsxfn6o4q/image/upload/c_fill,g_center,h_467,w_624/v1709834119/pf57xsmkimybqcmcd6x0.jpg",
  "Macan Turbo": "https://ev-database.org/img/auto/Porsche_Macan_Turbo_2024/Porsche_Macan_Turbo_2024-01@2x.jpg",
  "Macan Electric": "https://images.pistonheads.com/nimg/49162/blobid0.jpg",
  "Macan 4 Electric": "https://a.storyblok.com/f/322327/3840x1236/a01595b462/ma24t4cox0013-macan-4-front-2.jpg/m/2560x822/smart/filters:format(webp)?dpl=dpl_G86bViAJTFcXwTrnmbN7qKVBRY6G",
  "Panamera": "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ttNzdfZnIvb3JpZ2luYWwvUE9SU0NIRS9QQU5BTUVSQS81MTMzM19CRVJMSU5FLUEtSEFZT04tNS1QT1JURVMvcGFuYW1lcmEtMC5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEwMjQsImhlaWdodCI6bnVsbCwiZml0IjoiY292ZXIifX19",
  "Panamera 4": "https://res.cloudinary.com/dsxfn6o4q/image/upload/c_fill,g_center,h_467,w_624/v1673740515/xlgn60d94cakomftlu4i.jpg",
  "Panamera 4S": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKISHkOkeV8iImqEoXFPGCyWurLpKrHTdfSg&s",
  "Panamera GTS": "https://www.wheelbecome.com/wp-content/uploads/2025/01/Porsche-Panamera-GTS-black-cartier-87-scaled.jpg",
  "Panamera Turbo": "https://images-porsche.imgix.net/-/media/730FE3C58C394077ACAF4990A20B0B61_BACDF254ED004E75B738EAA1D6532F25_PA24P5AOX0001-panamera-turbo-e-hybrid-front?w=2560&h=1440&q=45&crop=faces%2Centropy%2Cedges&auto=format",
  "Panamera Turbo S": "https://www.annonces-automobile.com/images/data/actualite/main/110897.jpg",
  "Panamera E-Hybrid": "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2024/Products/Panamera-E-Hybrid-Models/Galerie/1101_roma_white_4s_u-crane_AKOS9259_edit_V01.jpg/jcr:content/1101_roma_white_4s_u-crane_AKOS9259_edit_V01.jpg",
  "Panamera Turbo S E-Hybrid": "https://cdn.motor1.com/images/mgl/88W42/s1/2021-porsche-panamera-turbo-s-e-hybrid-front-3-4.jpg",
  "Panamera Sport Turismo": "https://www.gaillardauto.com/content/uploads/2021/06/1-8.jpg",
  "Panamera Executive": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJCHXQy5dDg-_i5avkEWm3QSh4OYkDw_rWJA&s",
  "Taycan": "https://cdn.motor1.com/images/mgl/lpgmE/s1/porsche-panamera-s-e-hybrid-2021-rucksitze.jpg",
  "Taycan 4S": "https://a.storyblok.com/f/322327/2586x1449/7569dfbed6/taycan-4s.jpg/m/865x486/smart/filters:format(webp)?dpl=dpl_G86bViAJTFcXwTrnmbN7qKVBRY6G",
  "Taycan GTS": "https://www.topgear-magazine.fr/wp-content/uploads/2021/12/porsche_taycan_gts_essai_3.jpg",
  "Taycan Turbo": "https://www.largus.fr/images/styles/max_1300x1300/public/images/porsche-taycan-turbo-turbo-s-01.jpg?itok=XXI2Dqe6",
  "Taycan Turbo S": "https://cdn.elferspot.com/wp-content/uploads/2023/01/09/PORSCHE-TAYCAN-TURBO-S-for-sale-01.jpg?class=xl",
  "Taycan Sport Turismo": "https://www.turbo.fr/sites/default/files/2024-06/Porsche%20Taycan%20Sport%20Turismo.jpeg",
  "Taycan Cross Turismo": "https://images.bfmtv.com/5n22APykd6uK4A6U9WVkVyOuhfk=/0x0:2048x1152/2048x0/images/Porsche-Taycan-Cross-Turismo-1936585.jpg",
  "Taycan Turbo GT": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiqFdoz6OnG1BHq5V1BEjq78EiwEDQfPYiVg&s",
};

const jaguarModelImages = {
  "XE": "https://i.ytimg.com/vi/nFy9t6bTYdk/maxresdefault.jpg",
  "XE S": "https://images.pistonheads.com/nimg/37982/Jaguar_XEV6S_03.jpg",
  "XE 300 Sport": "https://static.moniteurautomobile.be/imgcontrol/images_tmp/clients/moniteur/c1440-d720/content/medias/images/news/27000/900/0/jaguar-xe-300-sport-1.jpg",
  "XE SV Project 8": "https://www.automotivpress.fr/wp-content/uploads/2017/06/Jaguar-XE-SV-Project-8-9.jpg",
  "XF": "https://cms-assets.autoscout24.com/uaddx06iwzdz/5SxeLZNruFZ1LUmtVPltVh/bb2d9ee9ec1c3925caf7d4e5fa5712b2/jaguar-xf-l-01.jpg?w=1100",
  "XF Sportbrake": "https://images.ctfassets.net/uaddx06iwzdz/6jx8ZV9bUVlfNMDBvlNRRk/f069cbc98731686e8684596aabfe0bec/jaguar-xf-sportbrake-l-01.jpg",
  "XF S": "https://media.drive.com.au/obj/tx_q:50,rs:auto:1920:1080:1/caradvice/private/76a01f1ccf0059aaec4acf538d56505f",
  "XF 300 Sport": "https://www.topgear.com/sites/default/files/2022/04/1-Jaguar-XE-and-XF-update.jpg",
  "XF Portfolio": "https://voiture.kidioui.fr/image/img-auto/jaguar-xf.jpg",
  "XJ": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Jaguar_XJ_vs._Jetman_-_World-First_Desert_Drag_Race_%2822928441043%29_%28cropped%29.jpg",
  "XJ L": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW-Mj-LkKENOM0o7veb3NctLuKqhUenyZgfA&s",
  "XJ Supersport": "https://media.evo.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1556261312/evo/images/dir_755/car_photo_377680.jpg",
  "XJ Ultimate": "https://www.bramley.com/blobs/carsales/images/img_1417_9415.jpg?bgcolor=fff",
  "XK": "https://images.ctfassets.net/uaddx06iwzdz/61v7kcOf4V2qfaoQn97sS/e02dc727baf9c0751a25e98775a4aa65/jaguar-xk-l-01.jpg",
  "XKR": "https://www.gallery-aaldering.com/wp-content/uploads/2025/04/jaguar-xkr-convertible-43-000-kms-2007.jpg",
  "XKR-S": "https://blogautomobile.fr/wp-content/uploads/2011/03/XKRS.1.jpg",
  "XK Portfolio": "https://www.dealermanager.co.uk/images/201911/large/DM6384-glofsuix.JPG",
  "F-Type": "https://hips.hearstapps.com/hmg-prod/images/2024-jaguar-f-type-r75-convertible-151-edit-660f012e498ef.jpg?crop=0.546xw:0.460xh;0.345xw,0.439xh&resize=2048:*",
  "F-Type S": "https://lignonautomobiles.com/wp-content/uploads/2023/10/20231004_140309418_iOS-scaled.jpg",
  "F-Type R": "https://auto.cdn-rivamedia.com/2414/165078827-ibig.jpg",
  "F-Type SVR": "https://spots.ag/2018/10/22/jaguar-f-type-svr-coupe-2017-c643122102018165532_1.jpg",
  "F-Type P450": "https://images.pistonheads.com/nimg/49259/blobid0.jpg",
  "F-Pace": "https://cdn.motor1.com/images/mgl/NR8nM/s1/2021-jaguar-f-pace.jpg",
  "F-Pace S": "https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/wp-content/uploads/2016/11/2017-Jaguar-F-Pace-S-101.jpg?crop=0.900xw:0.844xh;0,0&resize=640:*",
  "F-Pace SVR": "https://www.largus.fr/images/styles/max_1300x1300/public/images/jaguar-f-pace-svr-2019.jpg?itok=aSoNU462",
  "F-Pace R-Dynamic": "https://www.drivencarguide.co.nz/media/100024529/img_4410.jpeg",
  "F-Pace P400e": "https://www.automobile-propre.com/wp-content/uploads/2021/05/DSC_0319_resultat.jpg",
  "E-Pace": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6V40o-DziShN5cJfnCwrlAU4f4ap_fjBXuA&s",
  "E-Pace R-Dynamic": "https://www.motorlegend.com/modules/breve/photos/src/jaguar-e-pace-22969-1.jpg",
  "E-Pace P300e": "https://cdn.automobile-propre.com/uploads/2020/10/Jaguar-E-Pace-P300e-hybride-rechargeable-2020-01.jpg",
  "I-Pace": "https://cdn.motor1.com/images/mgl/qvVZR/s1/jaguar-i-pace-lo-show-di-presentazione-dalle-19-del-1-marzo.jpg",
  "I-Pace EV400": "https://www.levelsautomobile.fr/images/neocatalog/1742/l_20231128172037-dsc03085.jpg",
  "I-Pace S": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk2iCfFPV5nF8_H7dU_cae-MPW5C2iUSa_HA&s",
  "I-Pace SE": "https://www.drivencarguide.co.nz/media/100024479/img_4759.jpeg",
  "I-Pace HSE": "https://images.pistonheads.com/nimg/47541/blobid0.jpg",
};

// ─── CONTACT PAGE URL (update this to match your actual route) ───────────────
const CONTACT_PAGE_URL = "/contact";

const brands = [
  { id: 1, brand: "Audi", image: "https://www.topgear.com/sites/default/files/2024/06/1%20Audi%20R8%20GT%20review.jpg", excerpt: "Audi offers different types of automatic transmissions across its lineup.", models: ["A1","A2","A3","A3 Sportback","A4","A4 Allroad","A4 Avant","A5","A5 Sportback","A6","A6 Allroad","A6 Avant","A7","A8","A8 L","Q2","Q3","Q3 Sportback","Q4 e-tron","Q4 Sportback e-tron","Q5","Q5 Sportback","Q6","Q7","Q8","Q8 e-tron","TT","TTS","TT RS","R8","R8 Spyder","RS3","RS3 Sportback","RS4 Avant","RS5","RS5 Sportback","RS6 Avant","RS7","S3","S4","S4 Avant","S5","S5 Sportback","S6","S7","S8","e-tron GT","RS e-tron GT"] },
  { id: 2, brand: "BMW", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80", excerpt: "The German manufacturer BMW supplies the majority of its vehicles with ZF automatics.", models: ["118i","120i","120d","125i","128ti","130i","M135i","218i","220i","220d","225i","230i","M235i","228i Gran Coupé","316i","318i","320i","320d","325i","330i","330e","340i","M340i","M3","M3 Competition","420i","430i","420d","430d","440i","M440i","M4","M4 Competition","418i Gran Coupé","520i","523i","525i","530i","530e","540i","545e","550i","M550i","M5","M5 Competition","630i","640i","630d","640d","M635i","M6","640i Gran Turismo","730i","740i","740e","750i","M760i","730d","740d","840i","850i","M840i","M8","M8 Gran Coupé","X1","X2","X2 M35i","X3","X3 M","X3 M40i","X3 M Competition","X4","X4 M","X4 M40i","X4 M Competition","X5","X5 M","X5 M50i","X5 M Competition","X6","X6 M","X6 M50i","X6 M Competition","X7","X7 M60i","Z4 sDrive20i","Z4 M40i","i3","i4 eDrive40","i4 M50","i5","i7","iX","iX1","iX3","iX M60","M2","M2 Competition"] },
  { id: 3, brand: "Volkswagen", image: "https://images.caradisiac.com/logos/5/4/4/7/245447/S0-quel-volkswagen-t-roc-choisir-166795.jpg", excerpt: "Volkswagen's DSG dual-clutch gearbox revolutionised the automatic market.", models: ["Polo","Polo GTI","Golf","Golf Plus","Golf Sportsvan","Golf Alltrack","Golf GTI","Golf GTI Clubsport","Golf R","Golf GTE","Golf Variant","Passat","Passat Alltrack","Passat GTE","Passat Variant","Arteon","Arteon Shooting Brake","Arteon R","Tiguan","Tiguan Allspace","Tiguan R","T-Roc","T-Roc R","T-Cross","Taigo","Touareg","Touareg R","Touran","Grand Touran","Sharan","Caddy","Caddy Maxi","ID.3","ID.4","ID.4 GTX","ID.5","ID.5 GTX","ID.6","ID.7","ID.7 Tourer","Phaeton","Scirocco","Eos","CC","up!","e-up!"] },
  { id: 4, brand: "SEAT", image: "https://www.seat.fr/content/dam/countries/fr/seat-website/seat-cars/new-cars-vehicles/single-image-newest-models/new-seat-tarraco-suv-7-seater-accessories-hero-image.jpg", excerpt: "SEAT shares VAG group platforms and DSG transmissions across its range.", models: ["Ibiza","Ibiza FR","León","León ST","León FR","León Cupra","León e-Hybrid","León Sportstourer","Arona","Arona FR","Ateca","Ateca FR","Tarraco","Tarraco FR","Alhambra","Mii","Toledo","Exeo","Altea","Altea XL","Altea Freetrack","Cupra Formentor","Cupra Formentor VZ","Cupra Born","Cupra Ateca","Cupra León","Cupra León Sportstourer","Cupra Terramar"] },
  { id: 5, brand: "Peugeot", image: "https://www.topgear.com/sites/default/files/cars-car/image/2024/11/Hybrid5008_2024_EXT27.jpg", excerpt: "Peugeot equips many of its models with Aisin EAT automatic transmissions.", models: ["106","107","108","205","206","207","208","208 GT","208 GTi","301","305","306","307","308","308 SW","308 GT","308 GTi","405","406","407","408","508","508 SW","508 PSE","508 RXH","2008","3008","3008 GT","4007","4008","5008","5008 GT","Rifter","Traveller","Expert","Partner","Partner Tepee","RCZ","iOn","e-208","e-2008","e-308","e-3008","e-5008","Bipper","Boxer"] },
  { id: 6, brand: "Citroën", image: "https://wallpapers.com/images/featured/citroen-7lr1n6h99gjv58z6.jpg", excerpt: "Citroën uses Aisin and EAT8 automatic gearboxes across its range.", models: ["C1","C2","C3","C3 Aircross","C3 Picasso","C3 Pluriel","C4","C4 Cactus","C4 Picasso","C4 SpaceTourer","C4 X","C4 Grand Picasso","C5","C5 Aircross","C5 X","C5 Tourer","C6","C8","Grand C4 Picasso","Grand C4 SpaceTourer","Berlingo","Berlingo Multispace","SpaceTourer","DS3","DS3 Crossback","DS4","DS4 Crossback","DS5","DS7 Crossback","DS9","ë-C4","ë-C4 X","ë-Berlingo","ë-SpaceTourer","C-Zero","C-Elysée","Xantia","Xsara","Xsara Picasso","ZX","Saxo","Jumpy","Jumper"] },
  { id: 7, brand: "Renault", image: "https://car-images.bauersecure.com/wp-images/12770/renault-clio-2026-20.jpg", excerpt: "The first automatic transmissions fitted to Renault vehicles came from Aisin.", models: ["Twingo","Twingo RS","Clio","Clio RS","Clio RS Trophy","Clio E-Tech","Mégane","Mégane RS","Mégane RS Trophy","Mégane E-Tech","Mégane Grandtour","Laguna","Laguna Coupé","Laguna GT","Talisman","Talisman Estate","Fluence","Kangoo","Kangoo E-Tech","Scénic","Grand Scénic","Scénic E-Tech","Captur","Captur E-Tech","Kadjar","Koleos","Espace","Grand Espace","Vel Satis","Safrane","Zoe","Austral","Austral E-Tech","Arkana","Symbioz","Master","Trafic","Alaskan","Latitude"] },
  { id: 8, brand: "Porsche", image: "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2024/Products/992-II/0840_nevada_coupe_u-crane_AKOS0607_edit_V03-sky.jpg/jcr:content/0840_nevada_coupe_u-crane_AKOS0607_edit_V03-sky.jpg", excerpt: "Porsche uses PDK dual-clutch and Tiptronic automatics for performance driving.", models: ["911 Carrera","911 Carrera S","911 Carrera 4","911 Carrera 4S","911 Carrera T","911 Targa 4","911 Targa 4S","911 Targa 4 GTS","911 Turbo","911 Turbo S","911 GT3","911 GT3 RS","911 GT3 Touring","911 GT2 RS","911 GTS","911 Dakar","911 Sport Classic","718 Boxster","718 Boxster S","718 Boxster GTS","718 Boxster Spyder","718 Cayman","718 Cayman S","718 Cayman GTS","718 Cayman GT4","718 Cayman GT4 RS","718 Spyder RS","Cayenne","Cayenne S","Cayenne GTS","Cayenne Turbo","Cayenne Turbo S","Cayenne E-Hybrid","Cayenne Turbo E-Hybrid","Cayenne Coupé","Cayenne Turbo Coupé","Macan","Macan S","Macan GTS","Macan Turbo","Macan Electric","Macan 4 Electric","Panamera","Panamera 4","Panamera 4S","Panamera GTS","Panamera Turbo","Panamera Turbo S","Panamera E-Hybrid","Panamera Turbo S E-Hybrid","Panamera Sport Turismo","Panamera Executive","Taycan","Taycan 4S","Taycan GTS","Taycan Turbo","Taycan Turbo S","Taycan Sport Turismo","Taycan Cross Turismo","Taycan Turbo GT"] },
  { id: 9, brand: "Jaguar", image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Jaguar_XJ_vs._Jetman_-_World-First_Desert_Drag_Race_%2822928441043%29_%28cropped%29.jpg", excerpt: "Jaguar pairs its refined engines with ZF 8-speed automatic transmissions.", models: ["XE","XE S","XE 300 Sport","XE SV Project 8","XF","XF Sportbrake","XF S","XF 300 Sport","XF Portfolio","XJ","XJ L","XJ Supersport","XJ Ultimate","XK","XKR","XKR-S","XK Portfolio","F-Type","F-Type S","F-Type R","F-Type SVR","F-Type P450","F-Pace","F-Pace S","F-Pace SVR","F-Pace R-Dynamic","F-Pace P400e","E-Pace","E-Pace R-Dynamic","E-Pace P300e","I-Pace","I-Pace EV400","I-Pace S","I-Pace SE","I-Pace HSE"] },
];

// ─── Navigate to contact page with params ────────────────────────────────────
function goToContact(brand, model) {
  const params = new URLSearchParams({ brand, model });
  window.location.href = `${CONTACT_PAGE_URL}?${params.toString()}`;
}

function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}

function BrandCard({ brand, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.10)" : "0 1px 4px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column",
      }}
    >
      <div style={{ overflow: "hidden", height: 190 }}>
        <img src={brand.image} alt={brand.brand} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.35s ease" }} />
      </div>
      <div style={{ padding: "16px 18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ margin: "0 0 5px", fontSize: 17, fontWeight: 700, color: "#111" }}>{brand.brand}</h3>
        <p style={{ margin: "0 0 14px", fontSize: 13, color: "#666", lineHeight: 1.55, flex: 1 }}>{brand.excerpt}</p>
        <button
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          style={{ alignSelf: "flex-start", padding: "7px 18px", borderRadius: 8, border: "1.5px solid #2563eb", background: "transparent", color: "#2563eb", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#2563eb"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2563eb"; }}
        >
          Select model
        </button>
      </div>
    </div>
  );
}

function ModelCard({ name, brandName, onContactClick }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  let imageUrl = null;
  if (brandName === "Audi")             imageUrl = audiModelImages[name];
  else if (brandName === "BMW")         imageUrl = bmwModelImages[name];
  else if (brandName === "Volkswagen")  imageUrl = volkswagenModelImages[name];
  else if (brandName === "SEAT")        imageUrl = seatModelImages[name];
  else if (brandName === "Peugeot")     imageUrl = peugeotModelImages[name];
  else if (brandName === "Citroën")     imageUrl = citroenModelImages[name];
  else if (brandName === "Renault")     imageUrl = renaultModelImages[name];
  else if (brandName === "Porsche")     imageUrl = porscheModelImages[name];
  else if (brandName === "Jaguar")      imageUrl = jaguarModelImages[name];

  const showImage = imageUrl && !imgError;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", overflow: "hidden",
        boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.09)" : "0 1px 3px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "box-shadow 0.18s, transform 0.18s", cursor: "pointer",
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{
        height: 140, overflow: "hidden",
        background: showImage ? "#f0f4f8" : hovered ? "linear-gradient(135deg, #e8f0fe 0%, #dde8fa 100%)" : "linear-gradient(135deg, #f0f4f8 0%, #e8edf4 100%)",
        display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8,
        borderBottom: "1px solid #eef0f3", transition: "background 0.2s",
      }}>
        {showImage ? (
          <img src={imageUrl} alt={name} onError={() => setImgError(true)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.35s ease" }} />
        ) : (
          <>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={hovered ? "#93b4f0" : "#c5cdd8"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h2" /><path d="M19 17h2a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
              <rect x="5" y="5" width="14" height="14" rx="3" /><circle cx="8.5" cy="17" r="1.5" /><circle cx="15.5" cy="17" r="1.5" /><path d="M5 9h14" />
            </svg>
            <span style={{ fontSize: 10.5, color: hovered ? "#93b4f0" : "#c0c8d4", letterSpacing: "0.03em", transition: "color 0.2s" }}>Image coming soon</span>
          </>
        )}
      </div>

      <div style={{ padding: "11px 13px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: "#1a1a2e", marginBottom: 2 }}>{name}</div>
          <div style={{ fontSize: 11.5, color: "#94a3b8" }}>Boîte automatique</div>
        </div>
        {/* ── NEW: "Nous contacter" button on each model card ── */}
        <button
          onClick={(e) => { e.stopPropagation(); onContactClick(name); }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
            padding: "6px 0", background: hovered ? "#db0000" : "#f4f4f4",
            border: "none", borderRadius: 6, cursor: "pointer",
            fontSize: 11.5, fontWeight: 600,
            color: hovered ? "#fff" : "#444",
            transition: "background 0.18s, color 0.18s",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.06 1.23 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
          </svg>
          Nous contacter
        </button>
      </div>
    </div>
  );
}

function ModelsPage({ brand, onBack }) {
  const [search, setSearch] = useState("");
  const filtered = brand.models.filter((m) => m.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#f9f9fb" }}>
      <div style={{ padding: "14px 32px", borderBottom: "1px solid #e5e7eb", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#555", fontSize: 13.5, padding: 0, fontFamily: "'DM Sans', sans-serif" }}>
            <ArrowLeft /> Back
          </button>
          <span style={{ color: "#d1d5db" }}>|</span>
          <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#888" }}>
            <span onClick={onBack} style={{ color: "#888", cursor: "pointer" }}>Home</span>
            <span>›</span>
            <span onClick={onBack} style={{ color: "#888", cursor: "pointer" }}>RESOURCES</span>
            <span>›</span>
            <span style={{ color: "#2563eb", fontWeight: 600 }}>{brand.brand}</span>
          </nav>
        </div>
        <div style={{ position: "relative" }}>
          <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Rechercher ${brand.brand}...`} style={{ paddingLeft: 32, paddingRight: 14, paddingTop: 8, paddingBottom: 8, border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, color: "#333", outline: "none", fontFamily: "'DM Sans', sans-serif", width: 220, background: "#fafafa" }} />
        </div>
      </div>

      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img src={brand.image} alt={brand.brand} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: 24, left: 32 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>Sélectionner un modèle</div>
          <h1 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: "#fff", letterSpacing: "-0.4px" }}>{brand.brand}</h1>
          <div style={{ marginTop: 5, fontSize: 12.5, color: "rgba(255,255,255,0.7)" }}>
            {filtered.length} {filtered.length === 1 ? "modèle" : "modèles"} {search ? "trouvés" : "disponibles"}
          </div>
        </div>
      </div>

      {/* ── Helper banner ── */}
      <div style={{ background: "#fff7ed", borderBottom: "1px solid #fed7aa", padding: "10px 32px", display: "flex", alignItems: "center", gap: 8 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#ea580c"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
        <span style={{ fontSize: 12.5, color: "#9a3412", fontFamily: "'DM Sans', sans-serif" }}>
          Cliquez sur <strong>« Nous contacter »</strong> sous chaque modèle pour pré-remplir le formulaire de contact.
        </span>
      </div>

      <div style={{ padding: "28px 32px 48px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", color: "#aaa", fontSize: 15, paddingTop: 40 }}>Aucun modèle trouvé.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))", gap: 16 }}>
            {filtered.map((model) => (
              <ModelCard
                key={model}
                name={model}
                brandName={brand.brand}
                onContactClick={(modelName) => goToContact(brand.brand, modelName)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CarsPage() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return <ModelsPage brand={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#f9f9fb", padding: "40px 32px" }}>
      <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#888", marginBottom: 36 }}>
        <a href="#" style={{ color: "#888", textDecoration: "none" }}>Home</a>
        <span>›</span>
        <a href="#" style={{ color: "#888", textDecoration: "none" }}>RESOURCES</a>
        <span>›</span>
        <span style={{ color: "#2563eb", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Items</span>
      </nav>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 24 }}>
        {brands.map((b) => (
          <BrandCard key={b.id} brand={b} onClick={() => setSelected(b)} />
        ))}
      </div>
    </div>
  );
}