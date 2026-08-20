const events = [
  { year: "726", era: "开元十四年", title: "杨氏入蜀", kind: "history", text: "杨钊随族迁蜀，后来改名国忠。长安尚远，命运的线已悄然绷紧。", detail: "史实主轴：杨国忠早年经历，为后来进入权力中心埋下伏笔。" },
  { year: "735", era: "开元二十三年", title: "源生于岭南", kind: "fiction", text: "李家源出生。她尚不知道，自己的名字将被长安、东瀛与一场夜雨反复书写。", detail: "二创节点：李家源的身世由此展开。" },
  { year: "738", era: "开元二十六年", title: "贵妃受宠", kind: "history", text: "杨玉环入寿王府。盛世华灯之下，杨氏家族逐渐靠近宫城。", detail: "史实主轴：杨氏权势的起点之一。" },
  { year: "742", era: "天宝元年", title: "家明降生", kind: "fiction", text: "李家明出生。姐弟的路尚未分开，岭南的雨也还未落到长安。", detail: "二创节点：日后寻亲者李家明出生。" },
  { year: "744", era: "天宝三载", title: "入宫为舞", kind: "fusion", text: "李家源辗转进入长安，以舞者身份接近宫廷；历史与虚构第一次交叠。", detail: "融合节点：人物被卷入真实的宫廷秩序。" },
  { year: "745", era: "天宝四载", title: "贵妃册立", kind: "history", text: "杨玉环册为贵妃。杨氏显贵，长安的繁华也更像一场将醒未醒的梦。", detail: "史实主轴：杨氏家族权势迅速上升。" },
  { year: "746", era: "天宝五载", title: "猫影初现", kind: "fiction", text: "李家源的身份开始发生不可解释的变形，宫墙之间出现关于猫的隐秘传闻。", detail: "二创节点：自由、身份与亲缘的冲突第一次具象化。" },
  { year: "747", era: "天宝六载", title: "家明入长安", kind: "fiction", text: "李家明为寻家姊来到长安，投身门下，在权力的缝隙里寻找旧日踪迹。", detail: "二创节点：姐弟两条叙事线在长安逼近。" },
  { year: "748", era: "天宝七载", title: "南诏来客", kind: "fiction", text: "蓝信一自西南而来。故人归来，却让真假与记忆变得更加难辨。", detail: "二创节点：蓝信一进入长安主线。" },
  { year: "749", era: "天宝八载", title: "案卷暗生", kind: "fiction", text: "大理寺丞余家聪发现数起旧案彼此相连，案尾都指向同一片不可触碰的阴影。", detail: "二创节点：余家聪开始追索冤案。" },
  { year: "750", era: "天宝九载", title: "权门深处", kind: "fusion", text: "众人在杨氏权门内外短暂交会。每一次求生，都在替另一场灾难开门。", detail: "融合节点：虚构人物的选择与时代权力结构相撞。" },
  { year: "751", era: "天宝十载", title: "怛罗斯败讯", kind: "history", text: "唐军败于怛罗斯。远方战报抵达长安，盛世边缘出现一道难以忽视的裂缝。", detail: "史实主轴：帝国扩张受挫。" },
  { year: "752", era: "天宝十一载", title: "国忠为相", kind: "history", text: "杨国忠拜相，权势抵达顶峰。所有人的命运也被更紧地拴在这座城中。", detail: "史实主轴：杨国忠进入权力核心。" },
  { year: "753", era: "天宝十二载", title: "平冤无门", kind: "fiction", text: "余家聪试图为众人翻案，却发现律法能洗清罪名，未必能偿还失去的人。", detail: "二创节点：余家聪与冯振国的道路开始分歧。" },
  { year: "754", era: "天宝十三载", title: "刺意已决", kind: "fiction", text: "冯振国不再等待案卷给出答案，决定亲自踏出刺杀杨国忠的一步。", detail: "二创节点：命运分支前最后的共同节点。" },
  { year: "755", era: "天宝十四载", title: "渔阳鼙鼓", kind: "history", text: "安禄山起兵，安史之乱爆发。长安夜雨终于落进真正的乱世。", detail: "史实主轴：所有个人选择被战争重新改写。" },
  { year: "756", era: "至德元载", title: "长安失守", kind: "fusion", text: "玄宗西逃，长安陷落。有人东渡，有人死守，有人被捕，故事从此分作数条归途。", detail: "融合节点：历史节点与五条作品结局分支汇合。" }
];

const people = [
  ["李家源", "失踪者 · 舞者 · 猫", "在身份、自由与亲缘之间反复变形。"],
  ["李家明", "寻亲者 · 门客", "为寻找家姊进入长安权力的缝隙。"],
  ["蓝信一", "林邑旧友 · 归来者", "由南诏折返的人，归来时已真假难辨。"],
  ["余家聪", "大理寺丞", "为众人平冤，却未必能为至亲复仇。"],
  ["冯振国", "策划者 · 刺客", "站到众人沉默之后，决定亲自踏出最后一步。"],
  ["杨国忠", "权臣 · 漩涡中心", "从蜀地走入长安，也将所有人卷入盛世末路。"]
];

const branches = [
  ["DJ-01", "DJ线", "殊途东渡", "李家源随贵妃东渡，在京都等待一人；李家明遍寻家姊不得。", "终局：等待没有回音"],
  ["DJ-02", "DJ线", "雾海重逢", "东瀛重逢之时，姐姐以为恩人与弟弟都未死；来人却早已被药物改变。", "终局：故人面目模糊"],
  ["YD-01", "余地线", "长安死守", "冯振国刺杀失败，夫妻离心；城破之后，余家聪参军攻城。", "终局：二人皆殁"],
  ["YD-02", "余地线", "东瀛途中", "刺杀失败后，余家聪选择离开长安，却没能抵达海的另一边。", "终局：死于途中"],
  ["YD-03", "余地线", "城陷无归", "余家聪留守长安直至沦陷，冯振国被捕；他随后参军攻城。", "终局：长安无归人"]
];

const kindName = { history: "史实", fiction: "二创", fusion: "交叠" };

function renderEvents(filter = "all") {
  const shown = events.filter((event) => filter === "all" || event.kind === filter || (filter === "fiction" && event.kind === "fusion"));
  document.querySelector("#event-list").innerHTML = shown.map((event) => `
    <article class="event">
      <div class="date"><b>${event.year}</b><small>${event.era}</small></div>
      <i class="dot ${event.kind}"></i>
      <button type="button" aria-expanded="false">
        <span class="tag ${event.kind}">${kindName[event.kind]}</span>
        <h3>${event.title}</h3><p>${event.text}</p>
        <p class="detail">${event.detail}</p>
      </button>
    </article>`).join("");

  document.querySelectorAll(".event button").forEach((button) => {
    button.addEventListener("click", () => {
      const article = button.closest(".event");
      const open = article.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
    });
  });
}

document.querySelector("#people-list").innerHTML = people.map((person, index) => `
  <article class="person"><small>FILE ${String(index + 1).padStart(2, "0")}</small><div class="sigil">${person[0][0]}</div>
  <h3>${person[0]}</h3><em>${person[1]}</em><p>${person[2]}</p></article>`).join("");

document.querySelector("#branch-list").innerHTML = branches.map((branch) => `
  <article class="branch"><span>${branch[0]}</span><em>${branch[1]}</em><h3>${branch[2]}</h3>
  <p>${branch[3]}</p><small>${branch[4]}</small></article>`).join("");

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderEvents(button.dataset.filter);
  });
});

renderEvents();

