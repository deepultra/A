// script.js

// --- 1. 数据定义 ---
const teamsData = {
    A: [{ name: "墨西哥", flag: "https://flagcdn.com/w40/mx.png" }, { name: "南非", flag: "https://flagcdn.com/w40/za.png" }, { name: "韩国", flag: "https://flagcdn.com/w40/kr.png" }, { name: "捷克", flag: "https://flagcdn.com/w40/cz.png" }],
    B: [{ name: "加拿大", flag: "https://flagcdn.com/w40/ca.png" }, { name: "波黑", flag: "https://flagcdn.com/w40/ba.png" }, { name: "卡塔尔", flag: "https://flagcdn.com/w40/qa.png" }, { name: "瑞士", flag: "https://flagcdn.com/w40/ch.png" }],
    C: [{ name: "巴西", flag: "https://flagcdn.com/w40/br.png" }, { name: "摩洛哥", flag: "https://flagcdn.com/w40/ma.png" }, { name: "海地", flag: "https://flagcdn.com/w40/ht.png" }, { name: "苏格兰", flag: "https://flagcdn.com/w40/gb-sct.png" }],
    D: [{ name: "美国", flag: "https://flagcdn.com/w40/us.png" }, { name: "巴拉圭", flag: "https://flagcdn.com/w40/py.png" }, { name: "澳大利亚", flag: "https://flagcdn.com/w40/au.png" }, { name: "土耳其", flag: "https://flagcdn.com/w40/tr.png" }],
    E: [{ name: "德国", flag: "https://flagcdn.com/w40/de.png" }, { name: "库拉索", flag: "https://flagcdn.com/w40/cw.png" }, { name: "科特迪瓦", flag: "https://flagcdn.com/w40/ci.png" }, { name: "厄瓜多尔", flag: "https://flagcdn.com/w40/ec.png" }],
    F: [{ name: "荷兰", flag: "https://flagcdn.com/w40/nl.png" }, { name: "日本", flag: "https://flagcdn.com/w40/jp.png" }, { name: "瑞典", flag: "https://flagcdn.com/w40/se.png" }, { name: "突尼斯", flag: "https://flagcdn.com/w40/tn.png" }],
    G: [{ name: "比利时", flag: "https://flagcdn.com/w40/be.png" }, { name: "埃及", flag: "https://flagcdn.com/w40/eg.png" }, { name: "伊朗", flag: "https://flagcdn.com/w40/ir.png" }, { name: "新西兰", flag: "https://flagcdn.com/w40/nz.png" }],
    H: [{ name: "西班牙", flag: "https://flagcdn.com/w40/es.png" }, { name: "佛得角", flag: "https://flagcdn.com/w40/cv.png" }, { name: "沙特阿拉伯", flag: "https://flagcdn.com/w40/sa.png" }, { name: "乌拉圭", flag: "https://flagcdn.com/w40/uy.png" }],
    I: [{ name: "法国", flag: "https://flagcdn.com/w40/fr.png" }, { name: "塞内加尔", flag: "https://flagcdn.com/w40/sn.png" }, { name: "伊拉克", flag: "https://flagcdn.com/w40/iq.png" }, { name: "挪威", flag: "https://flagcdn.com/w40/no.png" }],
    J: [{ name: "阿根廷", flag: "https://flagcdn.com/w40/ar.png" }, { name: "阿尔及利亚", flag: "https://flagcdn.com/w40/dz.png" }, { name: "奥地利", flag: "https://flagcdn.com/w40/at.png" }, { name: "约旦", flag: "https://flagcdn.com/w40/jo.png" }],
    K: [{ name: "葡萄牙", flag: "https://flagcdn.com/w40/pt.png" }, { name: "刚果(金)", flag: "https://flagcdn.com/w40/cd.png" }, { name: "乌兹别克斯坦", flag: "https://flagcdn.com/w40/uz.png" }, { name: "哥伦比亚", flag: "https://flagcdn.com/w40/co.png" }],
    L: [{ name: "英格兰", flag: "https://flagcdn.com/w40/gb-eng.png" }, { name: "克罗地亚", flag: "https://flagcdn.com/w40/hr.png" }, { name: "加纳", flag: "https://flagcdn.com/w40/gh.png" }, { name: "巴拿马", flag: "https://flagcdn.com/w40/pa.png" }]
};

let selectedTeams = {};
let isBackendMode = false;

// --- 2. DOM 元素获取 ---
const groupsContainer = document.getElementById('groups-container');
const bracketContainer = document.getElementById('bracket-container');
const updateBracketBtn = document.getElementById('update-bracket-btn');
const backendSwitch = document.getElementById('backend-switch');
const backendStatusText = document.getElementById('backend-status');

// --- 3. 功能函数 ---

/**
 * 生成分组表格和积分榜
 */
function renderGroups() {
    groupsContainer.innerHTML = '';
    for (const groupName in teamsData) {
        const groupTeams = teamsData[groupName];
        
        const groupCard = document.createElement('div');
        groupCard.className = 'group-card';

        const header = document.createElement('div');
        header.className = 'group-header';
        header.textContent = `小组 ${groupName}`;
        groupCard.appendChild(header);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'group-content';

        const backendTable = document.createElement('table');
        backendTable.className = 'backend-table';
        backendTable.innerHTML = `
            <thead><tr><th>球队</th><th>积分</th></tr></thead>
            <tbody></tbody>
        `;
        const backendTbody = backendTable.querySelector('tbody');
        groupTeams.forEach(team => {
            const row = document.createElement('tr');
            row.className = 'team-row';
            row.dataset.group = groupName;
            row.dataset.name = team.name;
            row.dataset.flag = team.flag;
            row.innerHTML = `
                <td><img src="${team.flag}" alt="${team.name}国旗" class="team-flag">${team.name}</td>
                <td><input type="number" class="points-input" value="0" min="0" max="20"></td>
            `;
            backendTbody.appendChild(row);
        });
        contentDiv.appendChild(backendTable);

        const standingsTable = document.createElement('table');
        standingsTable.className = 'standings-table';
        standingsTable.innerHTML = `
            <thead><tr><th>排名</th><th>球队</th><th>积分</th></tr></thead>
            <tbody>
                <tr><td>1</td><td>-</td><td>0</td></tr>
                <tr><td>2</td><td>-</td><td>0</td></tr>
                <tr><td>3</td><td>-</td><td>0</td></tr>
                <tr><td>4</td><td>-</td><td>0</td></tr>
            </tbody>
        `;
        contentDiv.appendChild(standingsTable);
        
        groupCard.appendChild(contentDiv);
        groupsContainer.appendChild(groupCard);
    }
    applyBackendMode();
}

/**
 * 渲染路线图 (淘汰赛路线图版本)
 */
// script.js

// ... (其他部分保持不变) ...

/**
 * 渲染路线图 (网格化版本)
 */
function renderBracket() {
    // 1. 从 localStorage 加载已选择的球队
    const savedTeams = localStorage.getItem('selectedTeams');
    if (!savedTeams) {
        bracketContainer.innerHTML = '<p>请先更新积分榜以生成路线图。</p>';
        return;
    }
    const selectedTeams = JSON.parse(savedTeams);

    // 2. 定义淘汰赛的对阵顺序
    // 格式: [对阵1的胜者, 对阵2的胜者]
    const bracketStructure = [
        ['A1', 'B2'], ['C1', 'D2'], ['E1', 'F2'], ['G1', 'H2'],
        ['I1', 'J2'], ['K1', 'L2'], ['B1', 'A2'], ['D1', 'C2'],
        ['F1', 'E2'], ['H1', 'G2'], ['J1', 'I2'], ['L1', 'K2']
    ];

    // 3. 构建HTML
    let bracketHTML = '';
    bracketStructure.forEach((match, index) => {
        const team1Key = match[0];
        const team2Key = match[1];
        const team1 = selectedTeams[team1Key];
        const team2 = selectedTeams[team2Key];

        // 为每两场比赛创建一个阶段容器
        if (index % 2 === 0) {
            bracketHTML += `<div class="bracket-stage">`;
        }

        bracketHTML += `
            <div class="bracket-match">
                <div class="bracket-team">
                    <div class="team-info">
                        <img src="${team1.flag}" alt="${team1.name}国旗" class="flag">
                        <span class="name">${team1.name}</span>
                    </div>
                    <div class="score">-</div>
                    <div class="team-info">
                        <img src="${team2.flag}" alt="${team2.name}国旗" class="flag">
                        <span class="name">${team2.name}</span>
                    </div>
                </div>
            </div>
        `;

        // 每两场比赛后关闭阶段容器
        if ((index + 1) % 2 === 0) {
            bracketHTML += `</div>`;
        }
    });

    bracketContainer.innerHTML = bracketHTML;
}

/**
 * 更新选中的球队
 * @param {string} group - 球队所在的小组
 * @param {object} team - 球队对象
 * @param {string} position - 球队在小组中的位置 ('1' or '2')
 */
function updateSelectedTeams(group, team, position) {
    const key = `${group}${position}`;
    selectedTeams[key] = team;
    localStorage.setItem('selectedTeams', JSON.stringify(selectedTeams));
}

/**
 * 从 localStorage 加载之前的选择
 */
function loadSelectedTeams() {
    const savedTeams = localStorage.getItem('selectedTeams');
    if (savedTeams) {
        return JSON.parse(savedTeams);
    }
    return {};
}

/**
 * 根据积分更新积分榜和 selectedTeams
 */
function updateStandingsAndSelections() {
    const groupCards = document.querySelectorAll('.group-card');
    const selectedTeams = loadSelectedTeams(); // 加载现有选择

    groupCards.forEach(card => {
        const groupName = card.querySelector('.group-header').textContent.replace('小组 ', '');
        const rows = card.querySelectorAll('.team-row');
        const standingsBody = card.querySelector('.standings-table tbody');

        let teamsWithPoints = [];
        rows.forEach(row => {
            const name = row.dataset.name;
            const flag = row.dataset.flag;
            const points = parseInt(row.querySelector('.points-input').value) || 0;
            teamsWithPoints.push({ name, flag, points });
        });

        // 按积分降序排序
        teamsWithPoints.sort((a, b) => b.points - a.points);

        // 更新积分榜UI
        standingsBody.innerHTML = '';
        teamsWithPoints.forEach((team, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${team.flag}" alt="${team.name}国旗" class="team-flag">${team.name}</td>
                <td>${team.points}</td>
            `;
            standingsBody.appendChild(row);
        });

        // 自动选择前两名
        if (teamsWithPoints.length >= 1) {
            updateSelectedTeams(groupName, teamsWithPoints[0], '1');
        }
        if (teamsWithPoints.length >= 2) {
            updateSelectedTeams(groupName, teamsWithPoints[1], '2');
        }
    });
    renderBracket(); // 更新路线图
}

// ... (其他部分保持不变) ...

/**
 * 应用后台模式状态
 */
function applyBackendMode() {
    const isBackend = isBackendMode;
    backendSwitch.checked = isBackend;
    backendStatusText.textContent = isBackend ? '后台模式' : '前台模式';

    document.querySelectorAll('.backend-table').forEach(table => {
        table.style.display = isBackend ? 'table' : 'none';
    });
    document.querySelectorAll('.standings-table').forEach(table => {
        table.style.display = isBackend ? 'none' : 'table';
    });
}

// --- 4. 事件监听与初始化 ---

// 为分组表格添加事件委托
groupsContainer.addEventListener('click', (event) => {
    const clickedRow = event.target.closest('.team-row');
    if (clickedRow) {
        clickedRow.classList.toggle('selected');
    }
});

// 更新路线图按钮的点击事件
updateBracketBtn.addEventListener('click', () => {
    updateStandingsAndSelections();
    renderBracket();
    alert('路线图已根据积分更新！');
});

// 后台模式开关的点击事件
backendSwitch.addEventListener('change', () => {
    isBackendMode = backendSwitch.checked;
    applyBackendMode();
    localStorage.setItem('isBackendMode', isBackendMode);
});

// --- 5. 页面加载时初始化 ---
document.addEventListener('DOMContentLoaded', () => {
    loadSelectedTeams();
    const savedBackendState = localStorage.getItem('isBackendMode');
    if (savedBackendState !== null) {
        isBackendMode = JSON.parse(savedBackendState);
    }
    renderGroups();
    renderBracket();
});