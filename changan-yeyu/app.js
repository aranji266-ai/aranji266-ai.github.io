const events = [
  { year:"726", era:"开元十四年", title:"林甫欲扶寿王", text:"李林甫借宫中关系接近武惠妃，长安权局第一道暗流浮现。", detail:"寿王、太子与宰相之间的关系，从此成为此世界线的深层牵引。", kind:"history" },
  { year:"735", era:"开元二十三年", title:"三皇子事件", text:"玄宗欲废三子，张九龄极力劝阻，李林甫在退朝后留下那句意味深长的话。", detail:"“此乃天子家事。”沉默在这一年成为更锋利的表态。", kind:"history" },
  { year:"738", era:"开元二十六年", title:"玙立太子", text:"武惠妃病逝，寿王未能入主东宫；忠王李玙被立为太子，后改名李亨。", detail:"这次储位转折，最终会在马嵬驿之后回响。", kind:"history" },
  { year:"742", era:"天宝元年", title:"林甫拜相", text:"玄宗改官制，李林甫为右相兼尚书左仆射，相权愈重。", detail:"文人出将入相之路被逐渐截断，长安的门开始只向少数人打开。", kind:"history" },
  { year:"744", era:"天宝三载", title:"李杜初遇 · 十二时辰", text:"李白与杜甫相遇于洛阳；同年的上元灯火里，另一场长安危局转动齿轮。", detail:"史实与作品《长安十二时辰》在此重叠，构成观测档案里的第一层回声。", kind:"fusion" },
  { year:"745", era:"天宝四载", title:"杨国忠自蜀进京", text:"因杨氏得宠与章仇兼琼引荐，杨国忠携蜀地财货进入长安。", detail:"一个后来左右朝局的人，正式进入帝都视野。", kind:"history" },
  { year:"746", era:"天宝五载", title:"三子初遇", text:"三子自广州府赴京应试。失踪的猫、林邑奴与尚未被看见的命运在此交汇。", detail:"李家明可以参加科举，也可以为寻家姊放弃科举；第一处分支由此生成。", kind:"fiction" },
  { year:"747", era:"天宝六载", title:"野无遗贤", text:"李林甫专权，设计科举而无人中选，反以“野无遗贤”上表庆贺。", detail:"对没有门路的文人而言，边疆成为仅存的出口。", kind:"history" },
  { year:"748", era:"天宝七载", title:"杨国忠入朝为官", text:"杨国忠身兼诸使、迅速跻身重臣；被视作奇珍的李家源也被卷入宫廷。", detail:"李家源进京后变回人形，却又流落青楼，与蓝信一相遇。", kind:"fusion" },
  { year:"749", era:"天宝八载", title:"面赐金紫", text:"杨国忠掌钱谷、出入禁中；一支吸收南诏元素的舞，将李家源送入梨园。", detail:"李家明终于认出失散的家姊，而大理寺丞余家聪也被卷入这场搜寻。", kind:"fusion" },
  { year:"750", era:"天宝九载", title:"杨钊改名杨国忠", text:"玄宗赐名“国忠”。杨氏车马衣饰华贵，声势与荣宠一同抵达高处。", detail:"风光之下，南诏方向的战事已在酝酿。", kind:"history" },
  { year:"751", era:"天宝十载", title:"南诏兵变", text:"鲜于仲通讨南诏惨败，唐军损失惨重；蓝信一随军南下，命运线骤然偏转。", detail:"在这条原创支线里，蓝信一被视为叛唐，张少祖紧随其后。", kind:"fusion" },
  { year:"752", era:"天宝十一载", title:"林甫排国忠", text:"李林甫借南诏失利欲除杨国忠，却被玄宗召回。", detail:"旧相与新贵的角力进入最后阶段。", kind:"history" },
  { year:"753", era:"天宝十二载", title:"林甫病卒 · 国忠拜相", text:"李林甫卒，杨国忠接掌相位，兼领数十使。", detail:"朝堂权力完成交接，也把帝国推向更窄的航道。", kind:"history" },
  { year:"754", era:"天宝十三载", title:"征南诏军全军覆灭", text:"唐朝最后一次对南诏出兵，李宓军覆没。蓝信一归来，已是身份成谜的俘虏。", detail:"归来者是否还是故人，成为长安夜雨里最难回答的问题之一。", kind:"fusion" },
  { year:"755", era:"天宝十四载", title:"安史之乱", text:"范阳起兵，潼关告急。李善德被任命为荔枝使，猫与人的约定也催促李家源回城。", detail:"历史的洪流与《长安的荔枝》在这年并行，所有人物被迫重新选择去留。", kind:"fusion" },
  { year:"756", era:"天宝十五载", title:"马嵬驿兵变", text:"潼关失守、玄宗出逃，杨国忠与杨贵妃死于马嵬。长安陷落，世界线分裂。", detail:"DJ线与余地线从此分别通往东瀛、长安与无法验证的终局。", kind:"fusion" }
];

const people = [
  ["李家源", "失踪者 · 舞妓 · 猫", "在身份、自由与亲缘之间反复变形。"],
  ["李家明", "寻亲者 · 门客", "为寻找家姊进入长安权力的缝隙。"],
  ["蓝信一", "林邑人旧友 · 归来者", "由南诏折返的人，归来时已真假难辨。"],
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

