/**
 * WanderPal应用JavaScript
 * 
 * 实现基础交互功能：
 * - 屏幕切换
 * - 聊天对话流
 * - 简单表单处理
 */

// 存储应用状态
const appState = {
    currentScreen: 'splash-screen',
    personality: null,
    emotion: null,
    travelDates: null,
    duration: null,
    selectedDestination: null
};

// 页面加载后执行
document.addEventListener('DOMContentLoaded', function () {
    // 初始化显示启动屏幕
    showScreen('splash-screen');

    // 添加聊天输入事件监听
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-button');

    if (chatInput && sendButton) {
        // 发送按钮点击事件
        sendButton.addEventListener('click', function () {
            sendMessage(chatInput.value);
        });

        // 按回车键发送消息
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage(chatInput.value);
            }
        });
    }
});

/**
 * 切换显示的屏幕
 * @param {string} screenId - 要显示的屏幕ID
 */
function showScreen(screenId) {
    // 隐藏所有屏幕
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.add('hidden');
    });

    // 显示指定屏幕
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
        appState.currentScreen = screenId;

        // 如果切换到聊天屏幕，滚动到底部
        if (screenId === 'chat-screen') {
            scrollChatToBottom();
        }
    }
}

/**
 * 发送用户消息并获取回复
 * @param {string} text - 用户输入的消息
 */
function sendMessage(text) {
    if (!text.trim()) return;

    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.querySelector('.chat-input input');

    // 添加用户消息到聊天界面
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `
        <div class="message-bubble">
            <p>${text}</p>
        </div>
    `;
    chatMessages.appendChild(userMessage);

    // 清空输入框
    chatInput.value = '';

    // 滚动到底部
    scrollChatToBottom();

    // 模拟Agent回复（在实际应用中，这里会调用AI API）
    setTimeout(() => {
        simulateAgentResponse(text);
    }, 1000);
}

/**
 * 模拟Agent回复
 * @param {string} userText - 用户输入的消息
 */
function simulateAgentResponse(userText) {
    // 根据当前状态决定回复内容
    let responseText = '';
    let nextQuestion = null;

    if (appState.personality && !appState.emotion) {
        // 如果已选择性格但尚未选择情绪
        responseText = `了解您是${getPersonalityText(appState.personality)}的旅行者！现在，您能告诉我您现在的心情如何吗？`;
        nextQuestion = 'emotion';
    } else if (appState.personality && appState.emotion && !appState.travelDates) {
        // 如果已选择情绪但尚未选择旅行日期
        responseText = `感谢分享您的心情。您想要什么时候开始旅行呢？`;
        nextQuestion = 'dates';
    } else if (appState.personality && appState.emotion && appState.travelDates && !appState.duration) {
        // 如果已选择日期但尚未选择时长
        responseText = `${appState.travelDates}是个不错的选择！您希望旅行持续多少天？`;
        nextQuestion = 'duration';
    } else if (appState.personality && appState.emotion && appState.travelDates && appState.duration) {
        // 如果所有信息都已收集，提供推荐
        responseText = `根据您的信息，我为您准备了几个旅行推荐。请查看以下选项：`;
        nextQuestion = 'recommendations';
    } else {
        // 默认回复
        responseText = `感谢您的信息！我正在为您寻找完美的旅行方案。`;
    }

    // 添加Agent回复到聊天界面
    const chatMessages = document.getElementById('chat-messages');
    const agentMessage = document.createElement('div');
    agentMessage.className = 'message agent-message';
    agentMessage.innerHTML = `
        <div class="message-bubble">
            <p>${responseText}</p>
        </div>
    `;
    chatMessages.appendChild(agentMessage);

    // 添加下一个问题的选项
    if (nextQuestion === 'emotion') {
        addEmotionOptions();
    } else if (nextQuestion === 'dates') {
        addDateOptions();
    } else if (nextQuestion === 'duration') {
        addDurationOptions();
    } else if (nextQuestion === 'recommendations') {
        addRecommendations();
    }

    // 滚动到底部
    scrollChatToBottom();
}

/**
 * 选择性格
 * @param {string} personality - 选择的性格类型
 */
function selectPersonality(personality) {
    // 存储选择的性格
    appState.personality = personality;

    // 清除选项按钮
    const quickReplies = document.querySelector('.quick-replies');
    if (quickReplies) {
        quickReplies.remove();
    }

    // 添加用户选择到聊天
    const chatMessages = document.getElementById('chat-messages');
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `
        <div class="message-bubble">
            <p>${getPersonalityText(personality)}</p>
        </div>
    `;
    chatMessages.appendChild(userMessage);

    // 模拟Agent回复
    setTimeout(() => {
        const agentMessage = document.createElement('div');
        agentMessage.className = 'message agent-message';
        agentMessage.innerHTML = `
            <div class="message-bubble">
                <p>了解您是${getPersonalityText(personality)}的旅行者！现在，您能告诉我您现在的心情如何？</p>
            </div>
        `;
        chatMessages.appendChild(agentMessage);

        // 添加情绪选项
        addEmotionOptions();

        // 滚动到底部
        scrollChatToBottom();
    }, 1000);
}

/**
 * 获取性格文本描述
 * @param {string} personality - 性格类型
 * @returns {string} 性格描述文本
 */
function getPersonalityText(personality) {
    switch (personality) {
        case 'introverted': return '内向型';
        case 'extroverted': return '外向型';
        case 'explorer': return '探索者';
        case 'comfort': return '安逸型';
        default: return personality;
    }
}

/**
 * 添加情绪选项
 */
function addEmotionOptions() {
    const chatMessages = document.getElementById('chat-messages');
    const emotionOptions = document.createElement('div');
    emotionOptions.className = 'quick-replies';
    emotionOptions.innerHTML = `
        <button class="quick-reply" onclick="selectEmotion('escape')">想逃离</button>
        <button class="quick-reply" onclick="selectEmotion('rest')">寻求休息</button>
        <button class="quick-reply" onclick="selectEmotion('restart')">想重启</button>
        <button class="quick-reply" onclick="selectEmotion('company')">需要陪伴</button>
        <button class="quick-reply" onclick="selectEmotion('adventure')">冒险</button>
    `;
    chatMessages.appendChild(emotionOptions);
}

/**
 * 选择情绪
 * @param {string} emotion - 选择的情绪
 */
function selectEmotion(emotion) {
    // 存储选择的情绪
    appState.emotion = emotion;

    // 清除选项按钮
    const quickReplies = document.querySelector('.quick-replies');
    if (quickReplies) {
        quickReplies.remove();
    }

    // 添加用户选择到聊天
    const chatMessages = document.getElementById('chat-messages');
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `
        <div class="message-bubble">
            <p>${getEmotionText(emotion)}</p>
        </div>
    `;
    chatMessages.appendChild(userMessage);

    // 模拟Agent回复
    setTimeout(() => {
        const agentMessage = document.createElement('div');
        agentMessage.className = 'message agent-message';
        agentMessage.innerHTML = `
            <div class="message-bubble">
                <p>我理解您现在的心情。您希望什么时候出发旅行呢？</p>
            </div>
        `;
        chatMessages.appendChild(agentMessage);

        // 添加日期选项
        addDateOptions();

        // 滚动到底部
        scrollChatToBottom();
    }, 1000);
}

/**
 * 获取情绪文本描述
 * @param {string} emotion - 情绪类型
 * @returns {string} 情绪描述文本
 */
function getEmotionText(emotion) {
    switch (emotion) {
        case 'escape': return '我想逃离当前环境';
        case 'rest': return '我需要休息和放松';
        case 'restart': return '我想重新开始';
        case 'company': return '我需要陪伴';
        case 'adventure': return '我想要冒险';
        default: return emotion;
    }
}

/**
 * 添加日期选项
 */
function addDateOptions() {
    const chatMessages = document.getElementById('chat-messages');
    const dateOptions = document.createElement('div');
    dateOptions.className = 'quick-replies';
    dateOptions.innerHTML = `
        <button class="quick-reply" onclick="selectDates('next-week')">下周</button>
        <button class="quick-reply" onclick="selectDates('next-month')">下个月</button>
        <button class="quick-reply" onclick="selectDates('summer')">今年夏天</button>
        <button class="quick-reply" onclick="selectDates('winter')">今年冬天</button>
    `;
    chatMessages.appendChild(dateOptions);
}

/**
 * 选择旅行日期
 * @param {string} dates - 选择的日期
 */
function selectDates(dates) {
    // 存储选择的日期
    appState.travelDates = dates;

    // 清除选项按钮
    const quickReplies = document.querySelector('.quick-replies');
    if (quickReplies) {
        quickReplies.remove();
    }

    // 添加用户选择到聊天
    const chatMessages = document.getElementById('chat-messages');
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `
        <div class="message-bubble">
            <p>${getDatesText(dates)}</p>
        </div>
    `;
    chatMessages.appendChild(userMessage);

    // 模拟Agent回复
    setTimeout(() => {
        const agentMessage = document.createElement('div');
        agentMessage.className = 'message agent-message';
        agentMessage.innerHTML = `
            <div class="message-bubble">
                <p>${getDatesText(dates)}是个不错的选择！您希望旅行持续多少天？</p>
            </div>
        `;
        chatMessages.appendChild(agentMessage);

        // 添加时长选项
        addDurationOptions();

        // 滚动到底部
        scrollChatToBottom();
    }, 1000);
}

/**
 * 获取日期文本描述
 * @param {string} dates - 日期选择
 * @returns {string} 日期描述文本
 */
function getDatesText(dates) {
    switch (dates) {
        case 'next-week': return '下周';
        case 'next-month': return '下个月';
        case 'summer': return '今年夏天';
        case 'winter': return '今年冬天';
        default: return dates;
    }
}

/**
 * 添加时长选项
 */
function addDurationOptions() {
    const chatMessages = document.getElementById('chat-messages');
    const durationOptions = document.createElement('div');
    durationOptions.className = 'quick-replies';
    durationOptions.innerHTML = `
        <button class="quick-reply" onclick="selectDuration('3-5')">3-5天</button>
        <button class="quick-reply" onclick="selectDuration('7-10')">7-10天</button>
        <button class="quick-reply" onclick="selectDuration('14+')">14天以上</button>
    `;
    chatMessages.appendChild(durationOptions);
}

/**
 * 选择旅行时长
 * @param {string} duration - 选择的时长
 */
function selectDuration(duration) {
    // 存储选择的时长
    appState.duration = duration;

    // 清除选项按钮
    const quickReplies = document.querySelector('.quick-replies');
    if (quickReplies) {
        quickReplies.remove();
    }

    // 添加用户选择到聊天
    const chatMessages = document.getElementById('chat-messages');
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `
        <div class="message-bubble">
            <p>${duration}天</p>
        </div>
    `;
    chatMessages.appendChild(userMessage);

    // 模拟Agent回复
    setTimeout(() => {
        const agentMessage = document.createElement('div');
        agentMessage.className = 'message agent-message';
        agentMessage.innerHTML = `
            <div class="message-bubble">
                <p>非常好！根据您的性格、心情和时间安排，我为您准备了以下推荐：</p>
            </div>
        `;
        chatMessages.appendChild(agentMessage);

        // 添加推荐选项
        setTimeout(() => {
            addRecommendations();
        }, 500);

        // 滚动到底部
        scrollChatToBottom();
    }, 1000);
}

/**
 * 添加旅行推荐
 */
function addRecommendations() {
    const chatMessages = document.getElementById('chat-messages');

    // 创建推荐容器
    const recommendationsContainer = document.createElement('div');
    recommendationsContainer.className = 'recommendations-container';

    // 根据用户偏好添加合适的推荐
    let recommendations = '';

    // 如果用户想要逃离/休息，推荐自然风光
    if (appState.emotion === 'escape' || appState.emotion === 'rest') {
        recommendations += `
            <div class="recommendation-card">
                <div class="card-image" style="background-image: url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"></div>
                <div class="card-info">
                    <h4>日本京都</h4>
                    <p>文化休闲 • $$$ • ${appState.duration}天</p>
                    <p>寺庙、竹林和温泉，完美的宁静逃离</p>
                    <div class="card-buttons">
                        <button class="btn btn-secondary" onclick="viewDetails('kyoto')">查看详情</button>
                        <button class="btn btn-primary" onclick="selectDestination('kyoto')">选择此方案</button>
                    </div>
                </div>
            </div>
            
            <div class="recommendation-card">
                <div class="card-image" style="background-image: url('https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"></div>
                <div class="card-info">
                    <h4>云南大理</h4>
                    <p>自然风光 • $$ • ${appState.duration}天</p>
                    <p>古镇、洱海、雪山，融合自然与人文的疗愈之旅</p>
                    <div class="card-buttons">
                        <button class="btn btn-secondary" onclick="viewDetails('dali')">查看详情</button>
                        <button class="btn btn-primary" onclick="selectDestination('dali')">选择此方案</button>
                    </div>
                </div>
            </div>
        `;
    }

    // 如果用户想要冒险，推荐更有活力的地方
    if (appState.emotion === 'adventure' || appState.emotion === 'restart') {
        recommendations += `
            <div class="recommendation-card">
                <div class="card-image" style="background-image: url('https://images.unsplash.com/photo-1534050359320-02900022671e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"></div>
                <div class="card-info">
                    <h4>泰国清迈</h4>
                    <p>探险休闲 • $$ • ${appState.duration}天</p>
                    <p>丛林探险、寺庙参观、美食体验，活力与静谧的完美平衡</p>
                    <div class="card-buttons">
                        <button class="btn btn-secondary" onclick="viewDetails('chiangmai')">查看详情</button>
                        <button class="btn btn-primary" onclick="selectDestination('chiangmai')">选择此方案</button>
                    </div>
                </div>
            </div>
        `;
    }

    // 如果用户需要陪伴，推荐社交场所多的地方
    if (appState.emotion === 'company') {
        recommendations += `
            <div class="recommendation-card">
                <div class="card-image" style="background-image: url('https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"></div>
                <div class="card-info">
                    <h4>越南会安</h4>
                    <p>文化社交 • $ • ${appState.duration}天</p>
                    <p>古城街道、河畔咖啡馆、烹饪课程，结交新朋友的理想之地</p>
                    <div class="card-buttons">
                        <button class="btn btn-secondary" onclick="viewDetails('hoian')">查看详情</button>
                        <button class="btn btn-primary" onclick="selectDestination('hoian')">选择此方案</button>
                    </div>
                </div>
            </div>
        `;
    }

    // 设置推荐内容
    recommendationsContainer.innerHTML = recommendations;

    // 添加到聊天界面
    chatMessages.appendChild(recommendationsContainer);

    // 设置样式
    const style = document.createElement('style');
    style.textContent = `
        .recommendations-container {
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin: 16px 0;
            width: 100%;
        }
        
        .recommendation-card {
            background-color: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .card-image {
            height: 140px;
            background-size: cover;
            background-position: center;
        }
        
        .card-info {
            padding: 16px;
        }
        
        .card-info h4 {
            margin-bottom: 8px;
            color: #333;
        }
        
        .card-info p {
            color: #666;
            margin-bottom: 8px;
            font-size: 0.9rem;
        }
        
        .card-buttons {
            display: flex;
            gap: 8px;
            margin-top: 12px;
        }
    `;
    document.head.appendChild(style);

    // 滚动到底部
    scrollChatToBottom();
}

/**
 * 查看目的地详情
 * @param {string} destination - 目的地ID
 */
function viewDetails(destination) {
    // 在实际应用中，这里会获取并显示目的地详情
    console.log(`查看${destination}详情`);

    // 简化示例中直接模拟选择目的地
    selectDestination(destination);
}

/**
 * 选择目的地
 * @param {string} destination - 目的地ID
 */
function selectDestination(destination) {
    // 存储选择的目的地
    appState.selectedDestination = destination;

    // 添加用户选择到聊天
    const chatMessages = document.getElementById('chat-messages');
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `
        <div class="message-bubble">
            <p>我选择${getDestinationName(destination)}</p>
        </div>
    `;
    chatMessages.appendChild(userMessage);

    // 模拟Agent回复
    setTimeout(() => {
        const agentMessage = document.createElement('div');
        agentMessage.className = 'message agent-message';
        agentMessage.innerHTML = `
            <div class="message-bubble">
                <p>太棒了！我已经为您准备好了${getDestinationName(destination)}的详细行程。您可以在"档案"页面中查看完整行程安排。</p>
            </div>
        `;
        chatMessages.appendChild(agentMessage);

        // 添加查看行程按钮
        const actionButton = document.createElement('div');
        actionButton.className = 'quick-replies';
        actionButton.innerHTML = `
            <button class="btn btn-primary" onclick="showScreen('itinerary-screen')">查看行程</button>
        `;
        chatMessages.appendChild(actionButton);

        // 滚动到底部
        scrollChatToBottom();
    }, 1000);
}

/**
 * 获取目的地名称
 * @param {string} destination - 目的地ID
 * @returns {string} 目的地名称
 */
function getDestinationName(destination) {
    switch (destination) {
        case 'kyoto': return '日本京都';
        case 'dali': return '云南大理';
        case 'chiangmai': return '泰国清迈';
        case 'hoian': return '越南会安';
        default: return destination;
    }
}

/**
 * 滚动聊天窗口到底部
 */
function scrollChatToBottom() {
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
} 