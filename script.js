// script.js

// --- 1. 数据定义 ---
// 使用一个对象来存储所有球队信息，方便管理
// 注意：国旗图片URL需要您自己提供或从网络上获取
const teamsData = {
    // A组
    A: [
        { name: "美国", flag: "https://flagcdn.com/w40/us.png" },
        { name: "加拿大", flag: "https://flagcdn.com/w40/ca.png" },
        { name: "墨西哥", flag: "https://flagcdn.com/w40/mx.png" },
        { name: "巴西", flag: "https://flagcdn.com/w40/br.png" }
    ],
    // B组
    B: [
        { name: "英格兰", flag: "https://flagcdn.com/w40/gb-eng.png" },
        { name: "法国", flag: "https://flagcdn.com/w40/fr.png" },
        { name: "德国", flag: "https://flagcdn.com/w40/de.png" },
        { name: "西班牙", flag: "https://flagcdn.com/w40/es.png" }
    ],
    // C组
    C: [
        { name: "阿根廷", flag: "https://flagcdn.com/w40/ar.png" },
        { name: "葡萄牙", flag: "https://flagcdn.com/w40/pt.png" },
        { name: "乌拉圭", flag: "https://flagcdn.com/w40/uy.png" },
        { name: "克罗地亚", flag: "https://flagcdn.com/w40/hr.png" }
    ],
    // D组
    D: [
        { name: "比利时", flag: "https://flagcdn.com/w40/be.png" },
        { name: "荷兰", flag: "https://flagcdn.com/w40/nl.png" },
        { name: "丹麦", flag: "https://flagcdn.com/w40/dk.png" },
        { name: "瑞士", flag: "https://flagcdn.com/w40/ch.png" }
    ],
    // ... 可以继续添加更多小组
};

// 用于存储用户选择的球队
let selectedTeams = {};

// --- 2. DOM 元素获取 ---
const groupsContainer = document.getElementById('groups-container');
const bracketContainer = document.getElementById('bracket-container');
const updateBracketBtn = document.getElementById('update-bracket-btn');

// --- 3. 功能函数 ---

/** * 生成分组表格 */
function renderGroups() {
    groupsContainer.innerHTML = ''; // 清空容器
    for (const groupName in teamsData) {
        const groupTeams = teamsData[groupName];
        const table = document.createElement('table');
        table.className = 'group-table';

        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `<th colspan="2">小组 ${groupName}</th>`;
        table.appendChild(headerRow);

        groupTeams.forEach(team => {
            const row = document.createElement('tr');
            row.className = 'team-row';
            // 使用 dataset 存储球队信息，方便后续获取
            row.dataset.group = groupName;
            row.dataset.name = team.name;
            row.dataset.flag = team.flag;

            row.innerHTML = ` <td><img src="${team.flag}" alt="${team.name}国旗" class="team-flag"></td> <td>${team.name}</td> `;
            table.appendChild(row);
        });
        groupsContainer.appendChild(table);
    }
}

/** * 渲染路线图 */
function renderBracket() {
    bracketContainer.innerHTML = ''; // 清空容器

    // 定义淘汰赛阶段和对阵规则
    const bracketStages = [
        { name: '16强', matches: 8, matchups: [
            { home: 'A1', away: 'B2' }, { home: 'C1', away: 'D2' }, { home: 'E1', away: 'F2' }, { home: 'G1', away: 'H2' },
            { home: 'B1', away: 'A2' }, { home: 'D1', away: 'C2' }, { home: 'F1', away: 'E2' }, { home: 'H1', away: 'G2' }
        ]},
        { name: '8强', matches: 4, matchups: [
            { home: 'W49', away: 'W50' }, { home: 'W53', away: 'W54' },
            { home: 'W51', away: 'W52' }, { home: 'W55', away: 'W56' }
        ]},
        { name: '4强', matches: 2, matchups: [
            { home: 'W57', away: 'W58' }, { home: 'W59', away: 'W60' }
        ]},
        { name: '决赛', matches: 1, matchups: [
            { home: 'W61', away: 'W62' }
        ]}
    ];

    bracketStages.forEach(stage => {
        const stageDiv = document.createElement('div');
        stageDiv.className = 'bracket-stage';
        stageDiv.innerHTML = `<h3>${stage.name}</h3>`;

        stage.matchups.forEach(match => {
            const matchDiv = document.createElement('div');
            matchDiv.className = 'bracket-match';

            // 创建对阵双方的球队框
            ['home', 'away'].forEach(side => {
                const teamDiv = document.createElement('div');
                teamDiv.className = 'bracket-team';
                
                const teamKey = match[side];
                const team = selectedTeams[teamKey];

                if (team) {
                    teamDiv.innerHTML = ` <span class="flag"><img src="${team.flag}" alt="${team.name}"></span> <span class="name">${team.name}</span> `;
                } else {
                    teamDiv.classList.add('empty');
                    teamDiv.innerHTML = `待定 (${teamKey})`;
                }
                matchDiv.appendChild(teamDiv);
            });
            stageDiv.appendChild(matchDiv);
        });
        bracketContainer.appendChild(stageDiv);
    });
}

/** * 更新选中的球队 * @param {string} group - 球队所在的小组 * @param {object} team - 球队对象 * @param {string} position - 球队在小组中的位置 ('1' or '2') */
function updateSelectedTeams(group, team, position) {
    const key = `${group}${position}`;
    selectedTeams[key] = team;
    // 保存到 localStorage
    localStorage.setItem('selectedTeams', JSON.stringify(selectedTeams));
}

/** * 从 localStorage 加载之前的选择 */
function loadSelectedTeams() {
    const savedTeams = localStorage.getItem('selectedTeams');
    if (savedTeams) {
        selectedTeams = JSON.parse(savedTeams);
    }
}

// --- 4. 事件监听与初始化 ---

// 为分组表格添加事件委托
groupsContainer.addEventListener('click', (event) => {
    const clickedRow = event.target.closest('.team-row');
    if (clickedRow) {
        // 切换选中状态
        clickedRow.classList.toggle('selected');

        const groupName = clickedRow.dataset.group;
        const teamName = clickedRow.dataset.name;
        const teamFlag = clickedRow.dataset.flag;
        const team = { name: teamName, flag: teamFlag };

        // 如果是选中状态
        if (clickedRow.classList.contains('selected')) {
            // 检查该小组是否已选了两个队
            const selectedInGroup = Array.from(groupsContainer.querySelectorAll(`.team-row.selected[data-group="${groupName}"]`));
            if (selectedInGroup.length > 2) {
                alert(`小组 ${groupName} 只能选择两支球队！`);
                clickedRow.classList.remove('selected');
                return;
            }
            // 更新选中的球队
            const position = selectedInGroup.length === 1 ? '1' : '2';
            updateSelectedTeams(groupName, team, position);
        } else {
            // 如果是取消选中状态
            // 需要找到是第几个被取消的，并从 selectedTeams 中移除
            const allSelected = Object.keys(selectedTeams);
            let keyToRemove = null;
            for(const key of allSelected) {
                if (key.startsWith(groupName) && selectedTeams[key].name === teamName) {
                    keyToRemove = key;
                    break;
                }
            }
            if (keyToRemove) {
                delete selectedTeams[keyToRemove];
                // 重新整理该小组的排名
                const remainingInGroup = Array.from(groupsContainer.querySelectorAll(`.team-row.selected[data-group="${groupName}"]`));
                if (remainingInGroup.length > 0) {
                    const remainingTeam = {
                        name: remainingInGroup[0].dataset.name,
                        flag: remainingInGroup[0].dataset.flag
                    };
                    updateSelectedTeams(groupName, remainingTeam, '1');
                }
            }
            localStorage.setItem('selectedTeams', JSON.stringify(selectedTeams));
        }
    }
});

// 更新路线图按钮的点击事件
updateBracketBtn.addEventListener('click', () => {
    renderBracket();
    alert('路线图已更新！');
});

// --- 5. 页面加载时初始化 ---
document.addEventListener('DOMContentLoaded', () => {
    loadSelectedTeams(); // 加载之前的选择
    renderGroups();      // 渲染分组表格
    renderBracket();     // 渲染初始路线图
});