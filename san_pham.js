const danhSachSanPham = [

{
    id: 1,
    ten: "Clio Pro Eye Palette Air 01 Coral Studio 7.2g",
    thuongHieu: "Clio",
    danhMuc: "trangdiem",
    giaGoc: 450000,
    phanTramGiam: 0,
    hinhAnh: "images/Bảng mắt Clio Pro Eye Palette.png",
    moTa: "Bảng phấn mắt 12 ô với tông màu tự nhiên, dễ phối hợp cho trang điểm hằng ngày."
},

{
    id: 2,
    ten: "L'Oréal Paris Elseve Full Resist Shampoo & Conditioner 440ml",
    thuongHieu: "L'Oréal Paris",
    danhMuc: "chamsoctoc",
    giaGoc: 299000,
    phanTramGiam: 15,
    hinhAnh: "images/Bộ Gội Xả L'Oreal Paris Extraordinary Oil Dưỡng Tóc Suôn.png",
    moTa: "Bộ dầu gội và dầu xả giúp giảm gãy rụng, nuôi dưỡng tóc chắc khỏe."
},

{
    id: 3,
    ten: "Clio Kill Cover Founwear Cushion SPF50+ PA+++ 15g",
    thuongHieu: "Clio",
    danhMuc: "trangdiem",
    giaGoc: 590000,
    phanTramGiam: 18,
    hinhAnh: "images/Cushion Clio Kill Cover .png",
    moTa: "Cushion che phủ cao, bền màu và kiềm dầu tốt."
},

{
    id: 4,
    ten: "Laneige Neo Cushion Matte SPF42 PA++ 15g",
    thuongHieu: "Laneige",
    danhMuc: "trangdiem",
    giaGoc: 650000,
    phanTramGiam: 12,
    hinhAnh: "images/Cushion Laneige Neo Cushion .png",
    moTa: "Cushion cho lớp nền mỏng nhẹ, tự nhiên và lâu trôi."
},

{
    id: 5,
    ten: "L'Oréal Paris Elseve Extraordinary Oil 100ml",
    thuongHieu: "L'Oréal Paris",
    danhMuc: "chamsoctoc",
    giaGoc: 239000,
    phanTramGiam: 10,
    hinhAnh: "images/Dầu dưỡng tóc L'Oréal Elseve.png",
    moTa: "Dầu dưỡng tóc giúp tóc mềm mượt và hạn chế xơ rối."
},

{
    id: 6,
    ten: "Dove Nutritive Solutions Phục Hồi Hư Tổn 880g",
    thuongHieu: "Dove",
    danhMuc: "chamsoctoc",
    giaGoc: 189000,
    phanTramGiam: 8,
    hinhAnh: "images/Dầu gội Dove Phục Hồi Hư Tổn.png",
    moTa: "Làm sạch tóc và bổ sung dưỡng chất phục hồi tóc hư tổn."
},

{
    id: 7,
    ten: "Tsubaki Premium Moist & Repair Shampoo & Conditioner 490ml",
    thuongHieu: "Tsubaki",
    danhMuc: "chamsoctoc",
    giaGoc: 369000,
    phanTramGiam: 20,
    hinhAnh: "images/Dầu gội Tsubaki Premium Moist.png",
    moTa: "Bộ gội xả cao cấp giúp tóc mềm mượt và phục hồi hư tổn."
},

{
    id: 8,
    ten: "Clinique Moisture Surge 100H Auto-Replenishing Hydrator 50ml",
    thuongHieu: "Clinique",
    danhMuc: "chamsocda",
    giaGoc: 950000,
    phanTramGiam: 15,
    hinhAnh: "images/Gel dưỡng ẩm Clinique Moisture Surge.png",
    moTa: "Gel dưỡng ẩm cấp nước liên tục cho da lên đến 100 giờ."
},

{
    id: 9,
    ten: "The Saem Cover Perfection Tip Concealer SPF28 PA++ 6.5g",
    thuongHieu: "The Saem",
    danhMuc: "trangdiem",
    giaGoc: 129000,
    phanTramGiam: 5,
    hinhAnh: "images/Kem che khuyết điểm The Saem.png",
    moTa: "Che phủ quầng thâm, mụn và khuyết điểm hiệu quả."
},

{
    id: 10,
    ten: "Anessa Perfect UV Sunscreen Skincare Milk SPF50+ PA++++ 60ml",
    thuongHieu: "Anessa",
    danhMuc: "chongnang",
    giaGoc: 699000,
    phanTramGiam: 25,
    hinhAnh: "images/Kem chống nắng Anessa Perfect UV.png",
    moTa: "Chống nắng phổ rộng, chống nước và bền vững dưới ánh nắng."
},

{
    id: 11,
    ten: "Bioderma Photoderm Aquafluide SPF50+ 40ml",
    thuongHieu: "Bioderma",
    danhMuc: "chongnang",
    giaGoc: 459000,
    phanTramGiam: 15,
    hinhAnh: "images/Kem chống nắng Bioderma Photoderm.png",
    moTa: "Kem chống nắng kết cấu lỏng nhẹ, phù hợp da nhạy cảm."
},

{
    id: 12,
    ten: "Biore UV Aqua Rich Watery Essence SPF50+ PA++++ 70g",
    thuongHieu: "Biore",
    danhMuc: "chongnang",
    giaGoc: 249000,
    phanTramGiam: 10,
    hinhAnh: "images/Kem chống nắng Biore UV Aqua Rich.png",
    moTa: "Chống nắng dạng essence thấm nhanh, không nhờn rít."
},

{
    id: 13,
    ten: "Innisfree Intensive Long Lasting Sunscreen EX SPF50+ PA++++ 60ml",
    thuongHieu: "Innisfree",
    danhMuc: "chongnang",
    giaGoc: 320000,
    phanTramGiam: 12,
    hinhAnh: "images/Kem chống nắng Innisfree Intensive Long Lasting.png",
    moTa: "Kiểm soát dầu và bảo vệ da dưới ánh nắng mạnh."
},

{
    id: 14,
    ten: "La Roche-Posay Anthelios UVMune 400 SPF50+ 50ml",
    thuongHieu: "La Roche-Posay",
    danhMuc: "chongnang",
    giaGoc: 525000,
    phanTramGiam: 0,
    hinhAnh: "images/Kem chống nắng La Roche-Posay Anthelios.png",
    moTa: "Chống nắng phổ rộng với khả năng bảo vệ UVA dài."
},

{
    id: 15,
    ten: "Laneige Water Bank UV Barrier Sunscreen SPF50+ PA++++ 50ml",
    thuongHieu: "Laneige",
    danhMuc: "chongnang",
    giaGoc: 690000,
    phanTramGiam: 20,
    hinhAnh: "images/Kem chống nắng Laneige Watery Sun Cream.png",
    moTa: "Kem chống nắng dưỡng ẩm và bảo vệ da toàn diện."
},

{
    id: 16,
    ten: "Skin Aqua Tone Up UV Essence SPF50+ PA++++ 80g",
    thuongHieu: "Skin Aqua",
    danhMuc: "chongnang",
    giaGoc: 210000,
    phanTramGiam: 15,
    hinhAnh: "images/Kem chống nắng Skin Aqua Tone Up.png",
    moTa: "Nâng tông da tự nhiên kết hợp chống nắng hiệu quả."
},
{
    id: 17,
    ten: "Serum Kiehl's Clearly Corrective Dark Spot Solution 100ml",
    thuongHieu: "Kiehl's",
    danhMuc: "chamsocda",
    giaGoc: 1850000,
    phanTramGiam: 15,
    hinhAnh: "images/Serum Kiehl’s Clearly Corrective.png"
},

{
    id: 18,
    ten: "Some By Mi Yuja Niacin Anti Blemish Serum 50ml",
    thuongHieu: "Some By Mi",
    danhMuc: "chamsocda",
    giaGoc: 420000,
    phanTramGiam: 0,
    hinhAnh: "images/Serum Some By Mi Yuja Niacin.png"
},

{
    id: 19,
    ten: "The Ordinary Hyaluronic Acid 2% + B5 30ml",
    thuongHieu: "The Ordinary",
    danhMuc: "chamsocda",
    giaGoc: 350000,
    phanTramGiam: 8,
    hinhAnh: "images/Serum The Ordinary Hyaluronic Acid.png"
},

{
    id: 20,
    ten: "The Ordinary Niacinamide 10% + Zinc 1% 30ml",
    thuongHieu: "The Ordinary",
    danhMuc: "chamsocda",
    giaGoc: 320000,
    phanTramGiam: 0,
    hinhAnh: "images/Serum The Ordinary Niacinamide 10.png"
},

{
    id: 21,
    ten: "The Ordinary Retinol 0.5% In Squalane 30ml",
    thuongHieu: "The Ordinary",
    danhMuc: "chamsocda",
    giaGoc: 390000,
    phanTramGiam: 12,
    hinhAnh: "images/Serum The Ordinary Retinol 0.5.png"
},

{
    id: 22,
    ten: "Vichy Mineral 89 Booster 50ml",
    thuongHieu: "Vichy",
    danhMuc: "chamsocda",
    giaGoc: 750000,
    phanTramGiam: 15,
    hinhAnh: "images/Serum Vichy Mineral 89.png"
},

{
    id: 23,
    ten: "La Roche-Posay Effaclar H Iso-Biome 40ml",
    thuongHieu: "La Roche-Posay",
    danhMuc: "chamsocda",
    giaGoc: 465000,
    phanTramGiam: 0,
    hinhAnh: "images/Sữa rửa mặt La Roche-Posay Effaclar.png"
},

{
    id: 24,
    ten: "Laneige Water Bank Aqua Facial Serum 50ml",
    thuongHieu: "Laneige",
    danhMuc: "chamsocda",
    giaGoc: 890000,
    phanTramGiam: 15,
    hinhAnh: "images/Tinh chất Laneige Water Bank.png"
},
{
    id: 25,
    ten: "Dior Addict Lip Glow 001 Pink",
    thuongHieu: "Dior",
    danhMuc: "trangdiem",
    giaGoc: 950000,
    phanTramGiam: 0,
    hinhAnh: "images/Son dưỡng Dior Addict Lip Glow .png"
},

{
    id: 26,
    ten: "Rom&nd Zero Velvet Tint 06 Deep Soul",
    thuongHieu: "Rom&nd",
    danhMuc: "trangdiem",
    giaGoc: 220000,
    phanTramGiam: 10,
    hinhAnh: "images/Son kem Rom&nd Zero Velvet .png"
},

{
    id: 27,
    ten: "Peripera Ink Velvet 27 Strawberry Nude",
    thuongHieu: "Peripera",
    danhMuc: "trangdiem",
    giaGoc: 230000,
    phanTramGiam: 10,
    hinhAnh: "images/Son tint Peripera Ink Velvet.png"
},

{
    id: 28,
    ten: "Rom&nd Zero Velvet Tint Red Carpet",
    thuongHieu: "Rom&nd",
    danhMuc: "trangdiem",
    giaGoc: 220000,
    phanTramGiam: 12,
    hinhAnh: "images/Son kem Rom&nd Zero Velvet .png"
},
{
    id: 29,
    ten: "Cocoon Tinh Dầu Bưởi Hair Tonic 140ml",
    thuongHieu: "Cocoon",
    danhMuc: "chamsoctoc",
    giaGoc: 295000,
    phanTramGiam: 0,
    hinhAnh: "images/Tinh dầu bưởi Cocoon.png"
},

{
    id: 30,
    ten: "Moroccanoil Treatment Original 100ml",
    thuongHieu: "Moroccanoil",
    danhMuc: "chamsoctoc",
    giaGoc: 1190000,
    phanTramGiam: 15,
    hinhAnh: "images/Tinh dầu Moroccanoil Treatment.png"
},

{
    id: 31,
    ten: "Cocoon Toner Bí Đao 140ml",
    thuongHieu: "Cocoon",
    danhMuc: "chamsoctoc",
    giaGoc: 195000,
    phanTramGiam: 0,
    hinhAnh: "images/Toner Cocoon Bí Đao.png"
},

{
    id: 32,
    ten: "Some By Mi AHA BHA PHA Miracle Toner 150ml",
    thuongHieu: "Some By Mi",
    danhMuc: "chamsoctoc",
    giaGoc: 320000,
    phanTramGiam: 12,
    hinhAnh: "images/Toner Some By Mi AHA BHA PHA.png"
},
];