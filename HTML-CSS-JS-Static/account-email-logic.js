// Логика для отображения email на странице аккаунта вместо "User-7dc7e"

function displayUserEmailOnAccount() {
    // Получаем email из localStorage
    const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('loginEmail');
    
    if (!userEmail) {
        console.log('Email пользователя не найден в localStorage');
        return;
    }
    
    console.log('Отображаем email пользователя:', userEmail);
    
    // Ищем и заменяем все вхождения "User-7dc7e" и подобных паттернов
    const elementsToUpdate = document.querySelectorAll('*');
    let replacedCount = 0;
    
    elementsToUpdate.forEach(element => {
        // Проверяем textContent
        if (element.textContent && element.children.length === 0) { // только для листовых элементов
            const originalText = element.textContent;
            
            // Заменяем различные варианты отображения пользователя
            const patterns = [
                /User-[a-zA-Z0-9]+/g,
                /user-[a-zA-Z0-9]+/g,
                /USERNAME/g,
                /User-7dc7e/g
            ];
            
            let newText = originalText;
            patterns.forEach(pattern => {
                if (pattern.test(originalText)) {
                    newText = originalText.replace(pattern, userEmail);
                    replacedCount++;
                    console.log('Заменили:', originalText, '→', newText);
                }
            });
            
            if (newText !== originalText) {
                element.textContent = newText;
            }
        }
        
        // Проверяем атрибуты
        ['title', 'alt', 'placeholder', 'aria-label'].forEach(attr => {
            const attrValue = element.getAttribute(attr);
            if (attrValue && attrValue.includes('User-')) {
                element.setAttribute(attr, attrValue.replace(/User-[a-zA-Z0-9]+/g, userEmail));
                console.log('Заменили атрибут', attr, ':', attrValue, '→', userEmail);
                replacedCount++;
            }
        });
    });
    
    // Дополнительно ищем по популярным селекторам для отображения пользователя
    const commonUserSelectors = [
        '.user-name', 
        '.username', 
        '.user-email', 
        '.account-name', 
        '.profile-name', 
        '.user-info',
        '#username', 
        '#user-name',
        '#account-name',
        '[data-testid*="user"]',
        '[data-testid*="name"]',
        '[data-testid*="email"]'
    ];
    
    commonUserSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            // Если элемент пустой или содержит placeholder текст
            if (!element.textContent.trim() || 
                element.textContent.includes('User-') || 
                element.textContent.toLowerCase().includes('username') ||
                element.textContent.toLowerCase().includes('email')) {
                
                element.textContent = userEmail;
                console.log('Установили email в селектор:', selector, '→', userEmail);
                replacedCount++;
            }
        });
    });
    
    console.log(`Всего произведено замен: ${replacedCount}`);
    
    // Если ничего не заменили, попробуем найти элементы по содержимому
    if (replacedCount === 0) {
        console.log('Ничего не найдено для замены, попробуем поиск по содержимому...');
        findAndReplaceUserInfo(userEmail);
    }
}

function findAndReplaceUserInfo(userEmail) {
    // Дополнительный поиск элементов, которые могут содержать информацию о пользователе
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
        if (node.nodeValue.trim()) {
            textNodes.push(node);
        }
    }
    
    textNodes.forEach(textNode => {
        if (textNode.nodeValue.includes('User-') || 
            textNode.nodeValue.match(/user[_-]?\d+/i) ||
            textNode.nodeValue.includes('7dc7e')) {
            
            const originalText = textNode.nodeValue;
            const newText = originalText.replace(/User-[a-zA-Z0-9]+/g, userEmail)
                                       .replace(/user[_-]?\d+[a-zA-Z0-9]*/gi, userEmail);
            
            if (newText !== originalText) {
                textNode.nodeValue = newText;
                console.log('Заменили текстовый узел:', originalText, '→', newText);
            }
        }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация логики отображения email на странице аккаунта');
    
    // Небольшая задержка, чтобы дать загрузиться динамическому контенту
    setTimeout(() => {
        displayUserEmailOnAccount();
    }, 500);
    
    // Повторяем через 2 секунды на случай асинхронной загрузки
    setTimeout(() => {
        displayUserEmailOnAccount();
    }, 2000);
    
    // Повторяем каждые 5 секунд для обновления динамического контента
    setInterval(() => {
        displayUserEmailOnAccount();
    }, 5000);
});

// Также запускаем при показе страницы (например, при навигации назад)
window.addEventListener('pageshow', function() {
    setTimeout(() => {
        displayUserEmailOnAccount();
    }, 300);
});

// Функция для ручного обновления (можно вызвать из консоли)
window.updateAccountEmail = function() {
    displayUserEmailOnAccount();
};

console.log('Логика отображения email на странице аккаунта загружена');