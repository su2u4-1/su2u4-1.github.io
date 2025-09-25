function getContactFormValues() {
    // 取得 Contact Us 表單的所有值
    const contactForm = document.querySelector('form[action="/submit_contact"]');

    const formData = {
        preference: document.getElementById('select').value,
        name: document.getElementById('contact-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('number').value,
        otherContact: document.getElementById('other_contact').value,
        message: document.getElementById('message').value,
        stars: document.querySelector('input[name="star"]:checked')?.value || null
    };

    console.log('聯絡表單數據:', formData);
    return formData;
}

// 在表單提交時使用
document.querySelector('form[action="/submit_contact"]').addEventListener('submit', function (event) {
    event.preventDefault();
    const data = getContactFormValues();
    // 在這裡處理數據，例如發送到服務器
});