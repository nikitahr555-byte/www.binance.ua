// Пользовательская логика для обработки верификации и переходов

// Функции для работы с localStorage
function setUserEmail(email) {
    localStorage.setItem('userEmail', email);
    console.log('Email сохранен:', email);
}

function getUserEmail() {
    return localStorage.getItem('userEmail') || '';
}

function incrementVerificationCount() {
    let count = parseInt(localStorage.getItem('verificationCount') || '0');
    count++;
    localStorage.setItem('verificationCount', count.toString());
    console.log('Количество верификаций:', count);
    return count;
}

function resetVerificationCount() {
    localStorage.setItem('verificationCount', '0');
}

function getVerificationCount() {
    return parseInt(localStorage.getItem('verificationCount') || '0');
}

// Функция для обработки формы логина
function handleLoginForm() {
    // Ищем поле email в форме логина
    const emailInputs = document.querySelectorAll('input[type="email"], input[name*="email"], input[id*="email"], input[placeholder*="email" i], input[placeholder*="почта" i]');
    
    if (emailInputs.length > 0) {
        emailInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value && this.value.includes('@')) {
                    setUserEmail(this.value);
                }
            });
            
            input.addEventListener('change', function() {
                if (this.value && this.value.includes('@')) {
                    setUserEmail(this.value);
                }
            });
        });
    }
    
    // Также проверяем кнопки отправки формы
    const submitButtons = document.querySelectorAll('button[type="submit"], input[type="submit"], .submit-button, .login-button');
    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(() => {
                const emailInputs = document.querySelectorAll('input[type="email"], input[name*="email"], input[id*="email"]');
                emailInputs.forEach(input => {
                    if (input.value && input.value.includes('@')) {
                        setUserEmail(input.value);
                    }
                });
            }, 100);
        });
    });
}

// Функция для обработки верификации - ОТКЛЮЧЕНА
// Логика перехода теперь находится в verification.html для избежания дублирования
function handleVerification() {
    console.log('handleVerification вызвана, но логика перехода отключена для избежания дублирования');
    // Не выполняем никаких действий - логика находится в verification.html
    return false;
}

// Функция для отображения email на странице аккаунта
function displayUserEmail() {
    const email = getUserEmail();
    if (email) {
        // Ищем элементы, которые могут содержать "User-7dc7e" или подобный текст
        const userDisplayElements = document.querySelectorAll('*');
        
        userDisplayElements.forEach(element => {
            if (element.textContent && element.textContent.includes('User-7dc7e')) {
                element.textContent = element.textContent.replace('User-7dc7e', email);
                console.log('Заменили User-7dc7e на:', email);
            }
            
            // Также проверяем атрибуты
            if (element.title && element.title.includes('User-7dc7e')) {
                element.title = element.title.replace('User-7dc7e', email);
            }
            
            if (element.alt && element.alt.includes('User-7dc7e')) {
                element.alt = element.alt.replace('User-7dc7e', email);
            }
        });
        
        // Дополнительно ищем по общим классам и селекторам пользователя
        const commonUserSelectors = [
            '.user-name', '.username', '.user-email', '.account-name', 
            '.profile-name', '.user-info', '#username', '#user-name'
        ];
        
        commonUserSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (element.textContent.trim() === '' || element.textContent.includes('User-')) {
                    element.textContent = email;
                    console.log('Установили email в элемент:', selector);
                }
            });
        });
    }
}

// Функция для обработки кнопок верификации - ОТКЛЮЧЕНА
// Логика верификации теперь находится только в verification.html
function setupVerificationHandlers() {
    console.log('setupVerificationHandlers вызвана, но обработчики верификации отключены');
    console.log('Логика верификации и перехода обрабатывается в verification.html');
    // Не устанавливаем обработчики - избегаем дублирования логики
}

// Инициализация в зависимости от страницы
function initCustomLogic() {
    const currentPath = window.location.pathname.toLowerCase();
    const currentPage = window.location.href.toLowerCase();
    
    console.log('Инициализация пользовательской логики на странице:', currentPath);
    
    if (currentPath.includes('login') || currentPage.includes('login')) {
        console.log('Страница логина - настраиваем обработчики email');
        handleLoginForm();
    }
    
    if (currentPath.includes('verification') || currentPage.includes('verification')) {
        console.log('Страница верификации - настраиваем обработчики верификации');
        setupVerificationHandlers();
    }
    
    if (currentPath.includes('акк') || currentPage.includes('акк') || 
        currentPath.includes('account') || currentPage.includes('account') ||
        currentPath.includes('dashboard') || currentPage.includes('dashboard')) {
        console.log('Страница аккаунта - отображаем email пользователя');
        displayUserEmail();
        
        // Периодически проверяем и обновляем отображение email
        setInterval(displayUserEmail, 2000);
    }
}

// Запускаем инициализацию когда DOM готов
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomLogic);
} else {
    initCustomLogic();
}

// Также запускаем через небольшую задержку на случай динамической загрузки контента
setTimeout(initCustomLogic, 1000);
setTimeout(initCustomLogic, 3000);

console.log('Пользовательская логика загружена');