// script.js

// --- 1. 数据定义 ---
// 使用一个对象来存储所有球队信息，方便管理
// 注意：国旗图片URL需要您自己提供或从网络上获取
const teamsData = {
    // A组
    A: [
        { name: "墨西哥", flag: "https://flagcdn.com/w40/mx.png" },
        { name: "南非", flag: "https://flagcdn.com/w40/za.png" },
        { name: "韩国", flag: "https://flagcdn.com/w40/kr.png" },
        { name: "捷克", flag: "https://flagcdn.com/w40/cz.png" }
    ],
    // B组
    B: [
        { name: "加拿大", flag: "https://flagcdn.com/w40/ca.png" },
        { name: "波黑", flag: "https://flagcdn.com/w40/ba.png" },
        { name: "卡塔尔", flag: "https://flagcdn.com/w40/qa.png" },
        { name: "瑞士", flag: "https://flagcdn.com/w40/ch.png" }
    ],
    // C组
    C: [
        { name: "巴西", flag: "https://flagcdn.com/w40/br.png" },
        { name: "摩洛哥", flag: "https://flagcdn.com/w40/ma.png" },
        { name: "海地", flag: "https://flagcdn.com/w40/ht.png" },
        { name: "苏格兰", flag: "https://flagcdn.com/w40/gb-sct.png" }
    ],
    // D组
    D: [
        { name: "美国", flag: "https://flagcdn.com/w40/us.png" },
        { name: "巴拉圭", flag: "https://flagcdn.com/w40/py.png" },
        { name: "澳大利亚", flag: "https://flagcdn.com/w40/au.png" },
        { name: "土耳其", flag: "https://flagcdn.com/w40/tr.png" }
    ],
    // E组
    E: [
        { name: "德国", flag: "https://flagcdn.com/w40/de.png" },
        { name: "库拉索", flag: "https://flagcdn.com/w40/cw.png" },
        { name: "科特迪瓦", flag: "https://flagcdn.com/w40/ci.png" },
        { name: "厄瓜多尔", flag: "https://flagcdn.com/w40/ec.png" }
    ],
    // F组
    F: [
        { name: "荷兰", flag: "https://flagcdn.com/w40/nl.png" },
        { name: "日本", flag: "https://flagcdn.com/w40/jp.png" },
        { name: "瑞典", flag: "https://flagcdn.com/w40/se.png" },
        { name: "突尼斯", flag: "https://flagcdn.com/w40/tn.png" }
    ],
    // G组
    G: [
        { name: "比利时", flag: "https://flagcdn.com/w40/be.png" },
        { name: "埃及", flag: "https://flagcdn.com/w40/eg.png" },
        { name: "伊朗", flag: "https://flagcdn.com/w40/ir.png" },
        { name: "新西兰", flag: "https://flagcdn.com/w40/nz.png" }
    ],
    // H组
    H: [
        { name: "西班牙", flag: "https://flagcdn.com/w40/es.png" },
        { name: "佛得角", flag: "https://flagcdn.com/w40/cv.png" },
        { name: "沙特阿拉伯", flag: "https://flagcdn.com/w40/sa.png" },
        { name: "乌拉圭", flag: "https://flagcdn.com/w40/uy.png" }
    ],
    // I组
    I: [
        { name: "法国", flag: "https://flagcdn.com/w40/fr.png" },
        { name: "塞内加尔", flag: "https://flagcdn.com/w40/sn.png" },
        { name: "伊拉克", flag: "https://flagcdn.com/w40/iq.png" },
        { name: "挪威", flag: "https://flagcdn.com/w40/no.png" }
    ],
    // J组
    J: [
        { name: "阿根廷", flag: "https://flagcdn.com/w40/ar.png" },
        { name: "阿尔及利亚", flag: "https://flagcdn.com/w40/dz.png" },
        { name: "奥地利", flag: "https://flagcdn.com/w40/at.png" },
        { name: "约旦", flag: "https://flagcdn.com/w40/jo.png" }
    ],
    // K组
    K: [
        { name: "葡萄牙", flag: "https://flagcdn.com/w40/pt.png" },
        { name: "刚果(金)", flag: "https://flagcdn.com/w40/cd.png" },
        { name: "乌兹别克斯坦", flag: "https://flagcdn.com/w40/uz.png" },
        { name: "哥伦比亚", flag: "https://flagcdn.com/w40/co.png" }
    ],
    // L组
    L: [
        { name: "英格兰", flag: "https://flagcdn.com/w40/gb-eng.png" },
        { name: "克罗地亚", flag: "https://flagcdn.com/w40/hr.png" },
        { name: "加纳", flag: "https://flagcdn.com/w40/gh.png" },
        { name: "巴拿马", flag: "https://flagcdn.com/w40/pa.png" }
    ]
};

// 用于存储用户选择的球队
let selectedTeams = {};

// --- 2. DOM 元素获取 ---
const groupsContainer = document.getElementById('groups-container');
const bracketContainer = document.getElementById('bracket-container');
const updateBracketBtn = document.getElementById('update-bracket-btn');

// --- 3. 功能函数 ---

/**
 * 生成分组表格和积分榜
 */
function renderGroups() {
    groupsContainer.innerHTML = ''; // 清空容器
    for (const groupName in teamsData) {
        const groupTeams = teamsData[groupName];
        
        // 创建小组卡片容器
        const groupCard = document.createElement('div');
        groupCard.className = 'group-card';

        // 创建小组标题
        const header = document.createElement('div');
        header.className = 'group-header';
        header.textContent = `小组 ${groupName}`;
        groupCard.appendChild(header);

        // 创建内容容器
        const contentDiv = document.createElement('div');
        contentDiv.className = 'group-content';

        // 创建分组表格
        const table = document.createElement('table');
        table.className = 'group-table';

        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `<th>球队</th><th>选择</th>`;
        table.appendChild(headerRow);

        groupTeams.forEach(team => {
            const row = document.createElement('tr');
            row.className = 'team-row';
            row.dataset.group = groupName;
            row.dataset.name = team.name;
            row.dataset.flag = team.flag;

            row.innerHTML = `
                <td><img src="${team.flag}" alt="${team.name}国旗" class="team-flag">${team.name}</td>
                <td></td>
            `;
            table.appendChild(row);
        });
        contentDiv.appendChild(table);

        // 创建积分榜
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
}

/**
 * 渲染路线图
 */
function renderBracket() {
    bracketContainer.innerHTML = ''; // 清空容器

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

            ['home', 'away'].forEach(side => {
                const teamDiv = document.createElement('div');
                teamDiv.className = 'bracket-team';
                
                const teamKey = match[side];
                const team = selectedTeams[teamKey];

                if (team) {
                    teamDiv.innerHTML = `
                        <span class="flag"><img src="${team.flag}" alt="${team.name}"></span>
                        <span class="name">${team.name}</span>
                    `;
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
        selectedTeams = JSON.parse(savedTeams);
    }
}

// --- 4. 事件监听与初始化 ---

// 为分组表格添加事件委托
groupsContainer.addEventListener('click', (event) => {
    const clickedRow = event.target.closest('.team-row');
    if (clickedRow) {
        clickedRow.classList.toggle('selected');
        const groupName = clickedRow.dataset.group;
        const teamName = clickedRow.dataset.name;
        const teamFlag = clickedRow.dataset.flag;
        const team = { name: teamName, flag: teamFlag };

        if (clickedRow.classList.contains('selected')) {
            const selectedInGroup = Array.from(groupsContainer.querySelectorAll(`.team-row.selected[data-group="${groupName}"]`));
            if (selectedInGroup.length > 2) {
                alert(`小组 ${groupName} 只能选择两支球队！`);
                clickedRow.classList.remove('selected');
                return;
            }
            const position = selectedInGroup.length === 1 ? '1' : '2';
            updateSelectedTeams(groupName, team, position);
        } else {
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

updateBracketBtn.addEventListener('click', () => {
    renderBracket();
    alert('路线图已更新！');
});

// --- 5. 页面加载时初始化 ---
document.addEventListener('DOMContentLoaded', () => {
    loadSelectedTeams();
    renderGroups();
    renderBracket();
});