document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;

    // 실제 로그인 로직은 서버와 통신해야 합니다.
    // 여기서는 간단한 알림만 표시합니다.
    if (username) {
        alert(username + '님 환영합니다!');
    }
});
