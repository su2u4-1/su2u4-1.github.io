function getLoginFormValues() {
    // 取得 Login 表單的所有值
    const loginForm = document.querySelector('form[action="/submit_login"]');

    const formData = {
        name: loginForm.querySelector('input[name="name"]').value,
        password: loginForm.querySelector('input[name="password"]').value
    };

    console.log('登入表單數據:', formData);
    return formData;
}

// 在表單提交時使用
document.querySelector('form[action="/submit_login"]').addEventListener('submit', function (event) {
    event.preventDefault();
    const data = getLoginFormValues();
    // 在這裡處理數據，例如發送到服務器
});