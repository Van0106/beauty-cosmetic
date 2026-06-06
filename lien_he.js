 // Đợi trang load xong hoàn toàn mới chạy code
    document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.querySelector('.contact-left form') || document.querySelector('form');
        const submitBtn = document.querySelector('.btn-order') || document.querySelector('button');

        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault(); // Ngăn trang bị load lại

                // Lấy tất cả các ô input và textarea trong form
                const inputs = contactForm.querySelectorAll('input, textarea');
                let isEmpty = false;

                inputs.forEach(input => {
                    if (input.value.trim() === "") {
                        isEmpty = true;
                    }
                });

                if (isEmpty) {
                    alert("Vui lòng nhập đầy đủ thông tin còn bỏ trống!");
                } else {
                    alert("Thông tin của bạn đã được gửi thành công! Beauty Cosmetic Beauty sẽ phản hồi sớm nhất 💖");
                    contactForm.reset(); // Xóa trắng form sau khi gửi
                }
            });
        }
    });
