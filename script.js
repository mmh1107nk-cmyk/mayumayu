const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

$$("[data-scroll]").forEach(btn => btn.addEventListener("click", () => {
  $(btn.dataset.scroll).scrollIntoView({behavior:"smooth"});
}));

const info = {
  internet:{icon:"☁️", title:"インターネット", text:"世界中のネットワークがつながった「広い世界」。ここへ出るときは、ルーターなどを通って通信します。"},
  router:{icon:"📡", title:"ルーター", text:"LANとインターネットの間をつなぐ機器。家庭ではDHCPでIPアドレスを配ったり、外へ通信を中継したりします。"},
  pc:{icon:"💻", title:"PC", text:"この例では 192.168.1.20。これは家庭・学校などのLAN内で使うプライベートIPアドレスです。"},
  phone:{icon:"📱", title:"スマホ", text:"この例では 192.168.1.21。PCとは別の番号なので、同じLAN内で区別できます。"},
  printer:{icon:"🖨️", title:"プリンター", text:"この例では 192.168.1.30。固定IPにすると、いつも同じ住所で見つけやすくできます。"}
};
$$("[data-info]").forEach(el => el.addEventListener("click", () => {
  const d = info[el.dataset.info];
  $("#infoPanel").innerHTML = `<div class="info-icon">${d.icon}</div><div><b>${d.title}</b><p>${d.text}</p></div>`;
}));

const addresses = {
  global:{icon:"🌍",title:"グローバルIP",heading:"インターネット側の住所",text:"インターネット上で通信するときに使われる住所。家庭や学校では、ルーターが持つグローバルIPを複数の機器で共有することもあります。",example:"例：203.0.113.10"},
  private:{icon:"🏠",title:"プライベートIP",heading:"LANの中の住所",text:"家庭・学校・会社などのネットワーク内部で使う住所。代表的な範囲は 10.0.0.0/8、172.16.0.0/12、192.168.0.0/16 です。",example:"例：192.168.1.20"}
};
$$(".toggle").forEach(btn=>btn.addEventListener("click",()=>{
  $$(".toggle").forEach(x=>x.classList.remove("active")); btn.classList.add("active");
  const d=addresses[btn.dataset.address];
  $("#addressIcon").textContent=d.icon; $("#addressTitle").textContent=d.title;
  $("#addressHeading").textContent=d.heading; $("#addressText").textContent=d.text; $("#addressExample").textContent=d.example;
}));

const facts={
 ip:"IPアドレスは、ネットワーク上で機器を識別するための番号。IPv4では「192.168.1.20」のように4つの数字で表します。",
 mask:"サブネットマスクは、IPアドレスのうち「ネットワーク部分」と「機器部分」を区別するための情報。255.255.255.0 は /24 とも表せます。",
 gateway:"デフォルトゲートウェイは、別のネットワークへ出ていくときの「出口」。家庭や学校ではルーターがその役割を担うことが多いです。",
 dns:"DNSは、google.comのようなドメイン名をIPアドレスへ問い合わせる仕組み。人間が覚えやすい名前と数字の住所をつなぎます。"
};
$$(".fact-card").forEach(card=>card.addEventListener("click",()=>{
  $$(".fact-card").forEach(x=>x.classList.remove("selected")); card.classList.add("selected");
  $("#factDetail").textContent=facts[card.dataset.fact];
}));

const modes={
 dhcp:{icon:"⚡",title:"DHCPで自動設定",text:"ルーターなどのDHCPサーバーが、IPアドレスなどを自動で配ります。家庭や学校のPC・スマホなどでよく使われます。",chat:'ROUTER　「きみの住所は 192.168.1.20 ね！」'},
 static:{icon:"📌",title:"固定IPを手動設定",text:"サーバーやネットワーク機器など、いつも同じ住所でアクセスしたい機器では、固定IPを設定することがあります。",chat:'ADMIN　「この機器は 192.168.1.30 を使おう。」'}
};
$$(".mode").forEach(btn=>btn.addEventListener("click",()=>{
  $$(".mode").forEach(x=>x.classList.remove("active")); btn.classList.add("active");
  const d=modes[btn.dataset.mode];
  $("#modeResult").innerHTML=`<div class="mode-icon">${d.icon}</div><div><h3>${d.title}</h3><p>${d.text}</p><div class="chat">${d.chat}</div></div>`;
}));

const outputs={
 ipconfig:{
 text:`C:\\> ipconfig

Windows IP Configuration

Ethernet adapter Ethernet:
   IPv4 Address . . . . . : 192.168.1.20
   Subnet Mask . . . . .  : 255.255.255.0
   Default Gateway . . . : 192.168.1.1

C:\\>`,
 explain:"ipconfigは、自分のPCに設定されているIPアドレス、サブネットマスク、デフォルトゲートウェイなどを確認するコマンドです。"
 },
 ping:{
 text:`C:\\> ping 192.168.1.1

Pinging 192.168.1.1 with 32 bytes of data:
Reply from 192.168.1.1: bytes=32 time=2ms TTL=64
Reply from 192.168.1.1: bytes=32 time=1ms TTL=64
Reply from 192.168.1.1: bytes=32 time=2ms TTL=64

Ping statistics:
    Packets: Sent = 3, Received = 3, Lost = 0 (0% loss)

C:\\>`,
 explain:"pingは相手に小さな通信を送り、返事が返ってくるかを確認するテストです。"
 },
 "ping-google":{
 text:`C:\\> ping google.com

Pinging google.com [142.250.72.14] with 32 bytes of data:
Reply from 142.250.72.14: bytes=32 time=18ms TTL=117
Reply from 142.250.72.14: bytes=32 time=17ms TTL=117
Reply from 142.250.72.14: bytes=32 time=19ms TTL=117

Packets: Sent = 3, Received = 3, Lost = 0 (0% loss)

C:\\>`,
 explain:"名前でpingすると、まずDNSによってドメイン名がIPアドレスへ変換され、その後に通信が行われるイメージです。"
 }
};
$$(".cmd-btn").forEach(btn=>btn.addEventListener("click",()=>{
  if(btn.dataset.cmd==="clear"){ $("#terminalOutput").textContent="C:\\> _"; $("#commandExplain").textContent=""; return; }
  $("#terminalOutput").textContent=outputs[btn.dataset.cmd].text;
  $("#commandExplain").textContent=outputs[btn.dataset.cmd].explain;
}));

const quiz=[
 {q:"PCのIPアドレスが 192.168.1.20、ルーターが 192.168.1.1。PCがインターネットへ出るとき、まず関係するのは？",a:["デフォルトゲートウェイ","サブネットマスクだけ","プリンターのIP"],e:"別のネットワークへ出るときは、デフォルトゲートウェイ（多くの場合ルーター）が出口になります。"},
 {q:"「google.com」のような名前をIPアドレスへ対応づける仕組みは？",a:["DNS","DHCP","ping"],e:"DNSはドメイン名とIPアドレスを対応づける仕組みです。"},
 {q:"192.168.1.20 は、一般にどちらの種類のIPアドレス？",a:["プライベートIP","グローバルIP","どちらでもない"],e:"192.168.0.0/16はプライベートIPとして予約されている範囲です。"},
 {q:"PCの現在のIPアドレスなどをWindowsで確認する代表的なコマンドは？",a:["ipconfig","ping","format"],e:"ipconfigでIPアドレス、サブネットマスク、ゲートウェイなどを確認できます。"},
 {q:"pingの主な目的は？",a:["相手から返事が返るか通信をテストする","IPアドレスを自動で配る","Webページを作る"],e:"pingは相手へ通信を送り、応答が返るかなどを確認するために使われます。"}
];
let qi=0, score=0;
function renderQuiz(){
 const item=quiz[qi]; $("#quizProgress").textContent=`QUESTION ${qi+1} / ${quiz.length}`;
 $("#quizQuestion").textContent=item.q; $("#quizFeedback").textContent=""; $("#nextQuiz").hidden=true;
 $("#quizChoices").innerHTML=item.a.map((x,i)=>`<button class="choice" data-i="${i}">${String.fromCharCode(65+i)}　${x}</button>`).join("");
 $$(".choice").forEach(c=>c.addEventListener("click",()=>answerQuiz(+c.dataset.i)));
}
function answerQuiz(i){
 const correct=[0,0,0,0,0][qi];
 $$(".choice").forEach(c=>c.disabled=true);
 const clicked=$$(".choice")[i]; const right=$$(".choice")[correct];
 if(i===correct){score++; clicked.classList.add("correct"); $("#quizFeedback").textContent="✓ 正解！ "+quiz[qi].e;}
 else {clicked.classList.add("wrong"); right.classList.add("correct"); $("#quizFeedback").textContent="△ 惜しい！ "+quiz[qi].e;}
 $("#nextQuiz").hidden=false;
}
$("#nextQuiz").addEventListener("click",()=>{
 qi++;
 if(qi<quiz.length) renderQuiz();
 else{
  $("#quizProgress").textContent="MISSION COMPLETE";
  $("#quizQuestion").textContent=`スコア ${score} / ${quiz.length}　— 探検完了！`;
  $("#quizChoices").innerHTML=`<p>IPアドレスは「住所」、ゲートウェイは「出口」、DNSは「名前の通訳」。この3つを押さえればネットワークの見え方が変わります。</p>`;
  $("#quizFeedback").textContent="おつかれさま！";
  $("#nextQuiz").hidden=true;
 }
});
renderQuiz();
