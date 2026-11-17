/* English Comics — banco de conteúdo pedagógico.
   W(id, inglês, português, pronúncia, classe, significado, ícone, assunto, [[exemplo, tradução]], situações, [relacionadas]) */
(function () {
  const WORDS = [];
  let LV = "A1";
  function W(en, pt, pron, cls, meaning, icon, topic, ex, when, rel) {
    WORDS.push({ id: en.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, ""), en, pt, pron, cls, meaning, icon, topic, ex, when, rel, level: LV });
  }

  /* ───────── A1 — Iniciante ───────── */
  LV = "A1";
  W("need", "precisar", "NÍID", "verbo", "Usamos NEED para dizer que precisamos de alguma coisa ou precisamos fazer alguma atividade.", "🆘", "daily",
    [["I need help.", "Eu preciso de ajuda."], ["I need to study.", "Eu preciso estudar."], ["Do you need anything?", "Você precisa de alguma coisa?"], ["I need more time.", "Eu preciso de mais tempo."]],
    "Pedir ajuda, fazer pedidos em lojas e restaurantes, falar de obrigações no trabalho.", ["need to + verbo", "no need (não precisa)", "in need (necessitado)"]);
  W("want", "querer", "UÓNT", "verbo", "Expressa desejo. Para pedidos educados, prefira \"I'd like\".", "✨", "daily",
    [["I want a coffee.", "Eu quero um café."], ["Do you want to go out?", "Você quer sair?"], ["She wants a new job.", "Ela quer um emprego novo."]],
    "Falar de desejos e planos, convidar alguém, fazer escolhas.", ["want to + verbo", "I'd like (mais educado)", "wish (desejar)"]);
  W("have", "ter", "RÉV", "verbo", "Indica posse e também aparece em expressões do dia a dia, como \"have lunch\" (almoçar).", "🎒", "daily",
    [["I have two brothers.", "Eu tenho dois irmãos."], ["We have lunch at noon.", "Nós almoçamos ao meio-dia."], ["Do you have a minute?", "Você tem um minuto?"]],
    "Falar da família, das refeições, de compromissos e do que você possui.", ["have to (ter que)", "have breakfast", "have a good day"]);
  W("go", "ir", "GÔU", "verbo", "Indica movimento para algum lugar. Com atividades, usamos \"go + -ing\" (go shopping).", "🚶", "travel",
    [["I go to work by bus.", "Eu vou para o trabalho de ônibus."], ["Let's go!", "Vamos!"], ["We go shopping on Saturdays.", "Nós fazemos compras aos sábados."]],
    "Falar de rotina, transporte, viagens e convites.", ["go out (sair)", "go back (voltar)", "go on (continuar)"]);
  W("get", "conseguir / pegar / chegar / ficar", "GUÉT", "verbo", "Um dos verbos mais usados do inglês. O significado muda conforme o contexto: chegar, ficar, pegar, conseguir.", "🎯", "daily",
    [["I get home at 6 PM.", "Eu chego em casa às 18h."], ["I get tired after work.", "Eu fico cansado depois do trabalho."], ["Can you get me some water?", "Você pode pegar um pouco de água para mim?"]],
    "Rotina (chegar), sentimentos (ficar), favores (pegar) e conquistas (conseguir).", ["get up (levantar)", "get better (melhorar)", "get it (entender)"]);
  W("make", "fazer / preparar", "MÊIK", "verbo", "MAKE é fazer no sentido de criar ou produzir algo. Para atividades em geral, usamos DO.", "🛠️", "daily",
    [["I make breakfast every morning.", "Eu preparo o café da manhã toda manhã."], ["Don't make noise, please.", "Não faça barulho, por favor."], ["She made a mistake.", "Ela cometeu um erro."]],
    "Cozinhar, criar coisas, tomar decisões e falar de erros.", ["make a decision", "make money", "make sense (fazer sentido)"]);
  W("like", "gostar", "LÁIK", "verbo", "Diz que você gosta de algo. Depois de LIKE, use o verbo com -ing ou com to.", "👍", "feelings",
    [["I like pizza.", "Eu gosto de pizza."], ["Do you like your job?", "Você gosta do seu trabalho?"], ["I like reading at night.", "Eu gosto de ler à noite."]],
    "Falar de gostos, conhecer pessoas, escolher comida e lazer.", ["would like (gostaria)", "love (amar)", "dislike (não gostar)"]);
  W("work", "trabalhar / trabalho", "UÂRK", "verbo / substantivo", "WORK é trabalhar e também o lugar ou a atividade de trabalho. \"Go to work\" não leva artigo.", "💼", "work",
    [["I work every day.", "Eu trabalho todos os dias."], ["I work with computers.", "Eu trabalho com computadores."], ["The plan didn't work.", "O plano não funcionou."]],
    "Apresentação pessoal, entrevistas, conversas sobre rotina e quando algo funciona ou não.", ["work out (malhar / dar certo)", "workplace", "coworker"]);
  W("know", "saber / conhecer", "NÔU", "verbo", "KNOW serve para saber uma informação e para conhecer pessoas ou lugares. O K é mudo.", "💡", "info",
    [["I don't know.", "Eu não sei."], ["Do you know Maria?", "Você conhece a Maria?"], ["I know a good restaurant.", "Eu conheço um bom restaurante."]],
    "Responder perguntas, falar de pessoas conhecidas e indicar lugares.", ["let me know (me avise)", "you know (sabe...)", "knowledge (conhecimento)"]);
  W("help", "ajudar / ajuda", "RÉLP", "verbo / substantivo", "Pedir ou oferecer ajuda. Funciona como verbo e como substantivo.", "🤝", "info",
    [["Can you help me?", "Você pode me ajudar?"], ["Thanks for your help.", "Obrigado pela sua ajuda."], ["How can I help you?", "Como posso te ajudar?"]],
    "Lojas, atendimento, trabalho em equipe e emergências.", ["helpful (prestativo)", "help out", "Help yourself! (Sirva-se!)"]);
  W("eat", "comer", "ÍIT", "verbo", "Comer. No passado vira ATE (ÊIT).", "🍽️", "food",
    [["I eat rice and beans every day.", "Eu como arroz e feijão todos os dias."], ["Let's eat out tonight.", "Vamos comer fora hoje à noite."], ["What do you want to eat?", "O que você quer comer?"]],
    "Restaurantes, convites, rotina e hábitos alimentares.", ["eat out (comer fora)", "food (comida)", "meal (refeição)"]);
  W("water", "água", "UÓ-ter", "substantivo", "Água. É incontável: dizemos \"some water\" ou \"a glass of water\", nunca \"a water\" no sentido geral.", "💧", "food",
    [["Can I have some water, please?", "Pode me dar um pouco de água, por favor?"], ["I drink a lot of water.", "Eu bebo muita água."], ["Is the water cold?", "A água está gelada?"]],
    "Pedir em restaurantes, hábitos de saúde e viagens.", ["a glass of water", "sparkling water (com gás)", "still water (sem gás)"]);
  W("time", "tempo / vez / hora", "TÁIM", "substantivo", "TIME é tempo e também \"vez\" (one time, two times). Para perguntar as horas: \"What time is it?\".", "⏰", "daily",
    [["What time is it?", "Que horas são?"], ["I don't have time now.", "Eu não tenho tempo agora."], ["It's my first time here.", "É a minha primeira vez aqui."]],
    "Marcar compromissos, perguntar horas, falar de experiências.", ["on time (pontual)", "free time (tempo livre)", "sometimes (às vezes)"]);
  W("home", "casa / lar", "RÔUM", "substantivo", "HOME é o lar, o lugar onde você mora. Com verbos de movimento não usamos \"to\": go home.", "🏠", "family",
    [["I'm at home.", "Estou em casa."], ["I go home at 5.", "Eu vou para casa às 5."], ["Make yourself at home.", "Fique à vontade."]],
    "Rotina, convites, falar de onde você está.", ["homework (dever de casa)", "hometown (cidade natal)", "house (a construção)"]);
  W("friend", "amigo / amiga", "FRÉND", "substantivo", "Amigo ou amiga. Não tem gênero em inglês.", "🧑‍🤝‍🧑", "family",
    [["She is my best friend.", "Ela é minha melhor amiga."], ["I'm going out with friends.", "Vou sair com amigos."], ["This is my friend, Carlos.", "Este é meu amigo, Carlos."]],
    "Apresentar pessoas, falar de planos e da vida social.", ["friendly (simpático)", "make friends (fazer amigos)", "friendship (amizade)"]);

  W("come", "vir", "CÂM", "verbo", "Movimento em direção a quem fala. Passado: CAME.", "👋", "daily",
    [["Come here, please.", "Venha aqui, por favor."], ["Can you come to my party?", "Você pode vir à minha festa?"], ["I come from Brazil.", "Eu venho do Brasil."]],
    "Convites, dizer de onde você é, chamar alguém.", ["come back (voltar)", "come in (entrar)", "Come on! (Vamos! / Qual é!)"]);
  W("see", "ver", "SÍI", "verbo", "Ver, enxergar. Também significa entender em \"I see\" (entendi).", "👀", "daily",
    [["I see my parents on Sundays.", "Eu vejo meus pais aos domingos."], ["See you tomorrow!", "Até amanhã!"], ["I see. Thanks for explaining.", "Entendi. Obrigado por explicar."]],
    "Despedidas, encontros e para mostrar que entendeu algo.", ["See you!", "look (olhar)", "watch (assistir)"]);
  W("think", "pensar / achar", "THÍNK", "verbo", "Pensar e dar opinião (\"I think...\" = \"Eu acho...\"). O TH soa com a língua entre os dentes.", "🤔", "feelings",
    [["I think it's a good idea.", "Eu acho que é uma boa ideia."], ["What do you think?", "O que você acha?"], ["Let me think about it.", "Deixa eu pensar sobre isso."]],
    "Dar opinião, reuniões, decisões.", ["think about (pensar sobre)", "I don't think so (acho que não)", "thought (pensamento)"]);
  W("take", "pegar / levar / tomar", "TÊIK", "verbo", "TAKE tem vários sentidos: pegar, levar, tomar (remédio, ônibus) e demorar (tempo).", "✋", "travel",
    [["I take the bus to work.", "Eu pego o ônibus para o trabalho."], ["It takes 20 minutes.", "Leva 20 minutos."], ["Take your umbrella.", "Leve seu guarda-chuva."]],
    "Transporte, duração de atividades, remédios, conselhos.", ["take a picture (tirar foto)", "take care (se cuidar)", "take off (decolar)"]);
  W("buy", "comprar", "BÁI", "verbo", "Comprar. Passado: BOUGHT (BÓT).", "🛍️", "shopping",
    [["I want to buy a new phone.", "Eu quero comprar um celular novo."], ["Where can I buy tickets?", "Onde posso comprar ingressos?"], ["She bought a gift for you.", "Ela comprou um presente para você."]],
    "Lojas, viagens e presentes.", ["shopping (compras)", "store (loja)", "pay (pagar)"]);
  W("pay", "pagar", "PÊI", "verbo", "Pagar. \"Pay for\" = pagar por algo. Passado: PAID.", "💳", "shopping",
    [["Can I pay by card?", "Posso pagar com cartão?"], ["I'll pay for dinner.", "Eu pago o jantar."], ["How much did you pay?", "Quanto você pagou?"]],
    "Restaurantes, lojas, contas e viagens.", ["pay attention (prestar atenção)", "payment (pagamento)", "pay back (devolver dinheiro)"]);
  W("day", "dia", "DÊI", "substantivo", "Dia. Aparece em muitas expressões de cumprimento e rotina.", "☀️", "daily",
    [["Have a nice day!", "Tenha um bom dia!"], ["I study English every day.", "Eu estudo inglês todo dia."], ["What day is today?", "Que dia é hoje?"]],
    "Cumprimentos, rotina e datas.", ["today (hoje)", "day off (folga)", "every day (todo dia)"]);
  W("money", "dinheiro", "MÂ-ni", "substantivo", "Dinheiro. É incontável: \"much money\", não \"many moneys\".", "💰", "shopping",
    [["I don't have much money.", "Eu não tenho muito dinheiro."], ["I need to save money.", "Eu preciso economizar dinheiro."], ["Is this enough money?", "Isso é dinheiro suficiente?"]],
    "Compras, planejamento e trabalho.", ["save money (economizar)", "spend money (gastar)", "cash (dinheiro vivo)"]);
  W("family", "família", "FÉ-mi-li", "substantivo", "Família. Para falar de parentes, use também \"relatives\".", "👨‍👩‍👧", "family",
    [["I live with my family.", "Eu moro com minha família."], ["How is your family?", "Como está sua família?"], ["I have a big family.", "Eu tenho uma família grande."]],
    "Apresentação pessoal e conversas informais.", ["parents (pais)", "relatives (parentes)", "family dinner"]);
  W("tired", "cansado", "TÁI-erd", "adjetivo", "Cansado. \"Tired of\" = cansado de (saturado).", "😩", "feelings",
    [["I'm so tired today.", "Estou tão cansado hoje."], ["You look tired.", "Você parece cansado."], ["I'm tired of waiting.", "Estou cansado de esperar."]],
    "Falar de como você se sente, rotina e trabalho.", ["sleepy (com sono)", "exhausted (exausto)", "get tired (ficar cansado)"]);
  W("happy", "feliz", "RÉ-pi", "adjetivo", "Feliz, contente. Também usado para oferecer ajuda: \"I'm happy to help\".", "😄", "feelings",
    [["I'm happy to see you.", "Estou feliz em te ver."], ["Happy birthday!", "Feliz aniversário!"], ["Are you happy with the result?", "Você está satisfeito com o resultado?"]],
    "Comemorações, sentimentos e atendimento.", ["happiness (felicidade)", "glad (contente)", "unhappy (infeliz)"]);
  W("ask", "perguntar / pedir", "ÉSK", "verbo", "ASK é perguntar e também pedir algo a alguém. \"Ask for\" = pedir algo.", "❓", "info",
    [["Can I ask you a question?", "Posso te fazer uma pergunta?"], ["Ask for the menu.", "Peça o cardápio."], ["She asked me to wait.", "Ela me pediu para esperar."]],
    "Pedir informação, restaurantes, sala de aula, trabalho.", ["ask for (pedir algo)", "question (pergunta)", "answer (responder)"]);
  W("tell", "contar / dizer", "TÉL", "verbo", "TELL é dizer ALGO A ALGUÉM (tell me). SAY não exige a pessoa.", "🗣️", "info",
    [["Tell me about your day.", "Me conta sobre o seu dia."], ["Can you tell me the way to the station?", "Pode me dizer o caminho para a estação?"], ["He told me a secret.", "Ele me contou um segredo."]],
    "Pedir direções, conversas, histórias.", ["say (dizer)", "tell a story", "tell the truth"]);
  W("start", "começar", "STÁRT", "verbo", "Começar. Sinônimo de BEGIN, mais comum no dia a dia.", "🚀", "work",
    [["The meeting starts at 9.", "A reunião começa às 9."], ["I started a new course.", "Eu comecei um curso novo."], ["Let's start!", "Vamos começar!"]],
    "Horários, trabalho, estudos e projetos.", ["begin (começar)", "finish (terminar)", "start over (recomeçar)"]);
  W("understand", "entender", "ân-der-STÉND", "verbo", "Entender, compreender. Passado: UNDERSTOOD.", "🧠", "info",
    [["I don't understand.", "Eu não entendo."], ["Do you understand me?", "Você me entende?"], ["Now I understand the problem.", "Agora eu entendo o problema."]],
    "Aulas, reuniões, conversas com estrangeiros.", ["Could you repeat that? (pode repetir?)", "I see (entendi)", "got it (entendi)"]);

  /* ───────── A2 — Básico ───────── */
  LV = "A2";
  W("already", "já", "ól-RÉ-di", "advérbio", "Indica que algo aconteceu antes do esperado. Muito usado com o present perfect.", "✅", "daily",
    [["I've already eaten.", "Eu já comi."], ["Is it already 10 o'clock?", "Já são 10 horas?"], ["She already knows the answer.", "Ela já sabe a resposta."]],
    "Responder se algo foi feito, surpresa com horário.", ["yet (ainda / já, em perguntas)", "just (acabou de)", "still (ainda)"]);
  W("still", "ainda", "STÍL", "advérbio", "Algo continua acontecendo. Vem antes do verbo principal.", "⏳", "daily",
    [["I still live with my parents.", "Eu ainda moro com meus pais."], ["Are you still at work?", "Você ainda está no trabalho?"], ["It's still raining.", "Ainda está chovendo."]],
    "Falar de situações que continuam.", ["yet (ainda, em negativas)", "already (já)", "anymore (não mais)"]);
  W("borrow", "pegar emprestado", "BÓ-rou", "verbo", "BORROW é pegar emprestado. LEND é emprestar para alguém.", "📚", "daily",
    [["Can I borrow your pen?", "Posso pegar sua caneta emprestada?"], ["I borrowed a book from the library.", "Peguei um livro emprestado na biblioteca."], ["He borrowed money from his brother.", "Ele pegou dinheiro emprestado com o irmão."]],
    "Pedir objetos, biblioteca, dinheiro.", ["lend (emprestar)", "loan (empréstimo)", "give back (devolver)"]);
  W("book", "reservar / livro", "BÚK", "verbo / substantivo", "Além de livro, BOOK é reservar (hotel, mesa, voo).", "📅", "travel",
    [["I'd like to book a table for two.", "Eu gostaria de reservar uma mesa para dois."], ["I booked a hotel near the beach.", "Reservei um hotel perto da praia."], ["Is the flight fully booked?", "O voo está lotado?"]],
    "Viagens, restaurantes, consultas.", ["booking (reserva)", "reservation", "fully booked (lotado)"]);
  W("try", "tentar / experimentar", "TRÁI", "verbo", "Tentar fazer algo ou experimentar (comida, roupa).", "🧪", "shopping",
    [["Can I try this on?", "Posso experimentar isto?"], ["Try the chocolate cake.", "Experimente o bolo de chocolate."], ["I'll try again tomorrow.", "Vou tentar de novo amanhã."]],
    "Lojas de roupa, restaurantes, desafios.", ["try on (provar roupa)", "try out (testar)", "attempt (tentativa)"]);
  W("forget", "esquecer", "for-GUÉT", "verbo", "Esquecer. Passado: FORGOT.", "🫥", "daily",
    [["Don't forget your keys.", "Não esqueça suas chaves."], ["I forgot his name.", "Esqueci o nome dele."], ["I forgot to call you.", "Esqueci de te ligar."]],
    "Lembretes, desculpas e rotina.", ["remember (lembrar)", "forgetful (esquecido)", "Forget it! (Deixa pra lá!)"]);
  W("remember", "lembrar", "ri-MÉM-ber", "verbo", "Lembrar de algo. \"Remind\" é lembrar OUTRA pessoa.", "📌", "daily",
    [["I remember you!", "Eu me lembro de você!"], ["Remember to buy bread.", "Lembre-se de comprar pão."], ["Do you remember the password?", "Você lembra a senha?"]],
    "Lembretes, histórias e reencontros.", ["remind (lembrar alguém)", "memory (memória)", "forget (esquecer)"]);
  W("wait", "esperar", "UÊIT", "verbo", "Esperar. \"Wait for\" = esperar por alguém/algo.", "🕰️", "daily",
    [["Wait a minute, please.", "Espere um minuto, por favor."], ["I'm waiting for the bus.", "Estou esperando o ônibus."], ["I can't wait to see you!", "Mal posso esperar para te ver!"]],
    "Filas, atendimento, encontros.", ["wait for", "Can't wait! (mal posso esperar)", "hold on (aguarde)"]);
  W("bill", "conta (a pagar)", "BÍL", "substantivo", "A conta do restaurante ou de serviços. Nos EUA, no restaurante também se diz \"check\".", "🧾", "food",
    [["Can we have the bill, please?", "Pode trazer a conta, por favor?"], ["I pay my bills online.", "Eu pago minhas contas pela internet."], ["The electricity bill is high.", "A conta de luz está alta."]],
    "Restaurantes e contas de casa.", ["check (EUA)", "tip (gorjeta)", "split the bill (dividir a conta)"]);
  W("cheap", "barato", "TCHÍIP", "adjetivo", "Barato. Pode soar negativo (de baixa qualidade); \"affordable\" é mais elegante.", "🏷️", "shopping",
    [["This shirt is cheap.", "Esta camisa é barata."], ["Is there a cheaper option?", "Tem uma opção mais barata?"], ["Food is cheap here.", "A comida é barata aqui."]],
    "Compras, viagens e comparações.", ["expensive (caro)", "affordable (acessível)", "on sale (em promoção)"]);
  W("meeting", "reunião", "MÍI-tin", "substantivo", "Reunião. \"Have a meeting\" = ter uma reunião.", "📊", "work",
    [["I have a meeting at 10.", "Tenho uma reunião às 10."], ["The meeting was cancelled.", "A reunião foi cancelada."], ["Can we schedule a meeting?", "Podemos marcar uma reunião?"]],
    "Ambiente de trabalho e agendas.", ["schedule (agendar)", "agenda (pauta)", "call (ligação)"]);
  W("late", "atrasado / tarde", "LÊIT", "adjetivo / advérbio", "Atrasado ou tarde. \"Later\" = mais tarde.", "🏃", "work",
    [["Sorry, I'm late.", "Desculpe, estou atrasado."], ["It's getting late.", "Está ficando tarde."], ["See you later!", "Até mais tarde!"]],
    "Pedir desculpas, horários e despedidas.", ["early (cedo)", "on time (no horário)", "lately (ultimamente)"]);
  W("busy", "ocupado", "BÍ-zi", "adjetivo", "Ocupado (pessoa, lugar ou telefone).", "📞", "work",
    [["I'm busy right now.", "Estou ocupado agora."], ["The restaurant is very busy.", "O restaurante está muito cheio."], ["Are you busy tomorrow?", "Você está ocupado amanhã?"]],
    "Trabalho, convites e lugares cheios.", ["free (livre)", "business (negócio)", "crowded (lotado)"]);
  W("enjoy", "aproveitar / curtir", "en-DJÓI", "verbo", "Gostar de fazer algo e aproveitar. Depois de ENJOY, o verbo vai com -ing.", "🎉", "feelings",
    [["Enjoy your meal!", "Bom apetite!"], ["I enjoy cooking.", "Eu gosto de cozinhar."], ["Did you enjoy the trip?", "Você curtiu a viagem?"]],
    "Restaurantes, viagens e hobbies.", ["Enjoy! (Aproveite!)", "have fun (divertir-se)", "enjoyable (agradável)"]);
  W("decide", "decidir", "di-SÁID", "verbo", "Decidir. \"Decide to\" + verbo.", "⚖️", "work",
    [["I decided to study English.", "Eu decidi estudar inglês."], ["Have you decided?", "Você já decidiu?"], ["It's hard to decide.", "É difícil decidir."]],
    "Restaurantes (escolher prato), trabalho e planos.", ["decision (decisão)", "make up your mind", "choose (escolher)"]);

  /* ───────── B1 — Intermediário ───────── */
  LV = "B1";
  W("actually", "na verdade", "ÉK-tchu-a-li", "advérbio", "Cuidado: ACTUALLY não é \"atualmente\" (currently). Usamos para corrigir ou acrescentar uma informação.", "🔄", "daily",
    [["Actually, I'm from Minas Gerais.", "Na verdade, eu sou de Minas Gerais."], ["I actually liked the movie.", "Na verdade eu gostei do filme."], ["Actually, can we meet tomorrow?", "Na verdade, podemos nos encontrar amanhã?"]],
    "Corrigir informações com educação e mudar planos.", ["currently (atualmente)", "in fact (de fato)", "really (realmente)"]);
  W("deal with", "lidar com", "DÍIL uíth", "phrasal verb", "Resolver ou lidar com uma situação, pessoa ou problema.", "🧰", "work",
    [["I'll deal with it.", "Eu resolvo isso."], ["How do you deal with stress?", "Como você lida com o estresse?"], ["She deals with customers all day.", "Ela lida com clientes o dia todo."]],
    "Trabalho, problemas e atendimento.", ["handle (dar conta)", "cope with (enfrentar)", "a big deal (algo importante)"]);
  W("figure out", "descobrir / entender", "FÍ-guer ÁUT", "phrasal verb", "Descobrir como algo funciona ou encontrar uma solução pensando.", "🧩", "work",
    [["I can't figure out this problem.", "Não consigo descobrir a solução desse problema."], ["We'll figure it out.", "A gente dá um jeito."], ["Did you figure out the password?", "Você descobriu a senha?"]],
    "Resolver problemas técnicos, trabalho e estudos.", ["find out (descobrir informação)", "work out (resolver)", "solve (solucionar)"]);
  W("improve", "melhorar", "im-PRÚUV", "verbo", "Melhorar algo ou alguma habilidade.", "📈", "work",
    [["I want to improve my English.", "Quero melhorar meu inglês."], ["Your pronunciation has improved a lot.", "Sua pronúncia melhorou muito."], ["How can we improve the process?", "Como podemos melhorar o processo?"]],
    "Estudos, trabalho, feedback.", ["improvement (melhoria)", "get better (melhorar)", "upgrade (atualizar)"]);
  W("avoid", "evitar", "a-VÓID", "verbo", "Evitar. Depois de AVOID o verbo vai com -ing.", "🚧", "daily",
    [["Try to avoid sugar.", "Tente evitar açúcar."], ["I avoid driving at rush hour.", "Eu evito dirigir no horário de pico."], ["How can we avoid this mistake?", "Como podemos evitar esse erro?"]],
    "Saúde, trânsito, trabalho.", ["prevent (prevenir)", "skip (pular)", "stay away from (ficar longe de)"]);
  W("handle", "lidar / dar conta", "RÉN-dol", "verbo", "Conseguir controlar ou resolver algo.", "🎛️", "work",
    [["Can you handle this task?", "Você dá conta dessa tarefa?"], ["She handles pressure very well.", "Ela lida muito bem com pressão."], ["I'll handle the customers.", "Eu cuido dos clientes."]],
    "Trabalho, responsabilidades, pressão.", ["deal with", "manage (administrar)", "Handle with care (manuseie com cuidado)"]);
  W("deadline", "prazo", "DÉD-láin", "substantivo", "Data limite para entregar algo.", "📆", "work",
    [["The deadline is Friday.", "O prazo é sexta-feira."], ["We need to meet the deadline.", "Precisamos cumprir o prazo."], ["Can we extend the deadline?", "Podemos estender o prazo?"]],
    "Projetos, estudos e trabalho.", ["due date (data de vencimento)", "meet a deadline", "miss a deadline (perder o prazo)"]);
  W("suggest", "sugerir", "sag-DJÉST", "verbo", "Sugerir. Não use \"suggest me\"; diga \"suggest something\" ou \"suggest that...\".", "💬", "work",
    [["I suggest we start now.", "Sugiro que comecemos agora."], ["Can you suggest a good hotel?", "Você pode sugerir um bom hotel?"], ["What do you suggest?", "O que você sugere?"]],
    "Reuniões, viagens, restaurantes.", ["suggestion (sugestão)", "recommend (recomendar)", "advise (aconselhar)"]);
  W("worried", "preocupado", "UÂ-rid", "adjetivo", "Preocupado. \"Worried about\" = preocupado com.", "😟", "feelings",
    [["I'm worried about the exam.", "Estou preocupado com a prova."], ["Don't be worried.", "Não fique preocupado."], ["She looks worried.", "Ela parece preocupada."]],
    "Expressar sentimentos, conversas de apoio.", ["worry (preocupar-se)", "anxious (ansioso)", "Don't worry! (Não se preocupe!)"]);
  W("afford", "ter condições de pagar", "a-FÓRD", "verbo", "Ter dinheiro (ou tempo) suficiente para algo. Quase sempre com CAN/CAN'T.", "🏦", "shopping",
    [["I can't afford a new car.", "Não tenho condições de comprar um carro novo."], ["Can we afford this trip?", "Podemos bancar essa viagem?"], ["We can't afford to lose time.", "Não podemos nos dar ao luxo de perder tempo."]],
    "Finanças, compras e decisões.", ["affordable (acessível)", "budget (orçamento)", "expensive (caro)"]);
  W("realize", "perceber", "RÍ-a-láiz", "verbo", "Cuidado: REALIZE é perceber, não \"realizar\" (achieve / carry out).", "😮", "feelings",
    [["I realized I was wrong.", "Percebi que estava errado."], ["Do you realize what time it is?", "Você percebe que horas são?"], ["She didn't realize the problem.", "Ela não percebeu o problema."]],
    "Conversas, desculpas e descobertas.", ["notice (notar)", "achieve (realizar, conquistar)", "become aware (tomar consciência)"]);
  W("run out of", "ficar sem", "RÂN ÁUT óv", "phrasal verb", "Acabar o estoque de algo; ficar sem.", "🪫", "daily",
    [["We ran out of coffee.", "Acabou o café."], ["My phone is running out of battery.", "Meu celular está ficando sem bateria."], ["I'm running out of time.", "Estou ficando sem tempo."]],
    "Casa, trabalho, viagens.", ["run low on (estar acabando)", "out of stock (esgotado)", "sold out (esgotado)"]);
  W("look forward to", "aguardar ansiosamente", "LÚK FÓR-uard tchu", "expressão", "Esperar algo com expectativa positiva. Depois vem substantivo ou verbo com -ing.", "🤩", "work",
    [["I look forward to hearing from you.", "Aguardo seu retorno."], ["I'm looking forward to the weekend.", "Estou ansioso pelo fim de semana."], ["We look forward to working with you.", "Estamos ansiosos para trabalhar com vocês."]],
    "E-mails profissionais, planos e viagens.", ["can't wait (mal posso esperar)", "expect (esperar, prever)", "excited about"]);
  W("though", "embora / mas", "DÔU", "conjunção / advérbio", "Embora. No fim da frase, significa \"mas\" ou \"apesar disso\".", "↔️", "daily",
    [["Though it was raining, we went out.", "Embora estivesse chovendo, nós saímos."], ["It's expensive. It's good, though.", "É caro. Mas é bom."], ["I like him, though he talks too much.", "Gosto dele, embora ele fale demais."]],
    "Contrastes em conversas e opiniões.", ["although (embora)", "even though (mesmo que)", "however (porém)"]);
  W("reliable", "confiável", "ri-LÁI-a-bol", "adjetivo", "Algo ou alguém em quem se pode confiar para funcionar bem.", "🛡️", "work",
    [["She is a reliable employee.", "Ela é uma funcionária confiável."], ["This car is very reliable.", "Este carro é muito confiável."], ["We need a reliable internet connection.", "Precisamos de uma conexão de internet confiável."]],
    "Trabalho, tecnologia e recomendações.", ["rely on (contar com)", "trustworthy (digno de confiança)", "dependable"]);

  /* ───────── B2 — Intermediário avançado ───────── */
  LV = "B2";
  W("approach", "abordagem / abordar", "a-PRÔUTCH", "substantivo / verbo", "Forma de lidar com algo; também aproximar-se.", "🧭", "work",
    [["We need a different approach.", "Precisamos de uma abordagem diferente."], ["How should we approach this problem?", "Como devemos abordar esse problema?"], ["The holidays are approaching.", "As férias estão se aproximando."]],
    "Reuniões, estratégias e projetos.", ["method (método)", "strategy (estratégia)", "tackle (enfrentar)"]);
  W("issue", "problema / questão", "Í-chu", "substantivo", "Problema ou assunto a ser tratado; mais neutro que \"problem\".", "⚠️", "work",
    [["We have an issue with the server.", "Temos um problema com o servidor."], ["That's not the main issue.", "Essa não é a questão principal."], ["Let me know if you have any issues.", "Me avise se tiver qualquer problema."]],
    "Suporte técnico, reuniões e atendimento.", ["problem", "matter (assunto)", "address an issue (tratar um problema)"]);
  W("outcome", "resultado", "ÁUT-câm", "substantivo", "O resultado final de um processo ou evento.", "🏁", "work",
    [["We're happy with the outcome.", "Estamos satisfeitos com o resultado."], ["What was the outcome of the meeting?", "Qual foi o resultado da reunião?"], ["Nobody can predict the outcome.", "Ninguém pode prever o resultado."]],
    "Projetos, negociações e esportes.", ["result", "consequence (consequência)", "output (saída / produção)"]);
  W("reluctant", "relutante", "ri-LÂK-tant", "adjetivo", "Sem vontade de fazer algo; hesitante.", "🙅", "feelings",
    [["He was reluctant to change.", "Ele estava relutante em mudar."], ["I'm reluctant to sign the contract.", "Estou relutante em assinar o contrato."], ["She reluctantly agreed.", "Ela concordou de má vontade."]],
    "Negociações, decisões e opiniões.", ["hesitant (hesitante)", "unwilling (sem vontade)", "eager (ansioso, disposto)"]);
  W("overwhelmed", "sobrecarregado", "ôu-ver-UÉLMD", "adjetivo", "Sentir que há coisas demais para lidar ao mesmo tempo.", "🌊", "feelings",
    [["I feel overwhelmed at work.", "Me sinto sobrecarregado no trabalho."], ["She was overwhelmed with emotion.", "Ela ficou tomada pela emoção."], ["Don't get overwhelmed; take it step by step.", "Não se sobrecarregue; faça passo a passo."]],
    "Trabalho, estudos e emoções.", ["stressed (estressado)", "swamped (atolado)", "burnout (esgotamento)"]);
  W("set up", "configurar / montar", "SÉT ÂP", "phrasal verb", "Configurar equipamentos, organizar eventos ou montar um negócio.", "⚙️", "work",
    [["Can you set up the projector?", "Você pode configurar o projetor?"], ["We set up a meeting for Monday.", "Marcamos uma reunião para segunda."], ["He set up his own company.", "Ele montou a própria empresa."]],
    "TI, eventos, empreendedorismo.", ["setup (configuração)", "install (instalar)", "arrange (organizar)"]);
  W("come up with", "ter (uma ideia) / bolar", "CÂM ÂP uíth", "phrasal verb", "Criar ou pensar em uma ideia, plano ou solução.", "💡", "work",
    [["She came up with a great idea.", "Ela teve uma ótima ideia."], ["We need to come up with a solution.", "Precisamos encontrar uma solução."], ["Who came up with this name?", "Quem inventou esse nome?"]],
    "Brainstorming, reuniões e criatividade.", ["think of (pensar em)", "invent (inventar)", "brainstorm"]);
  W("straightforward", "simples / direto", "strêit-FÓR-uard", "adjetivo", "Fácil de entender ou fazer; também uma pessoa franca.", "➡️", "work",
    [["The process is straightforward.", "O processo é simples."], ["He's a straightforward person.", "Ele é uma pessoa direta."], ["Can you give me a straightforward answer?", "Pode me dar uma resposta direta?"]],
    "Instruções, feedback e personalidades.", ["simple", "clear (claro)", "complicated (complicado)"]);
  W("eventually", "no fim / finalmente", "i-VÉN-tchu-a-li", "advérbio", "Falso cognato: não é \"eventualmente\". Significa \"no final, depois de algum tempo\".", "🏆", "daily",
    [["Eventually, he found a job.", "No fim, ele conseguiu um emprego."], ["You'll eventually get used to it.", "Com o tempo você vai se acostumar."], ["We eventually arrived at 2 AM.", "Finalmente chegamos às 2 da manhã."]],
    "Histórias, conselhos e resultados.", ["occasionally (eventualmente)", "finally (finalmente)", "in the end (no fim)"]);
  W("thoroughly", "minuciosamente", "THÂ-ro-li", "advérbio", "De forma completa e cuidadosa.", "🔍", "work",
    [["Read the contract thoroughly.", "Leia o contrato com atenção."], ["We tested the system thoroughly.", "Testamos o sistema minuciosamente."], ["I thoroughly enjoyed the trip.", "Eu curti muito a viagem."]],
    "Revisões, testes e contratos.", ["thorough (minucioso)", "carefully (cuidadosamente)", "in detail (em detalhe)"]);
  W("assume", "supor / presumir", "a-SSÚUM", "verbo", "Achar que algo é verdade sem ter certeza. Também assumir (responsabilidade).", "🤷", "work",
    [["I assume you're tired.", "Suponho que você esteja cansado."], ["Don't assume anything.", "Não presuma nada."], ["She assumed responsibility for the project.", "Ela assumiu a responsabilidade pelo projeto."]],
    "Reuniões, discussões e responsabilidades.", ["assumption (suposição)", "suppose (supor)", "take for granted"]);
  W("bring up", "mencionar / trazer à tona", "BRÍN ÂP", "phrasal verb", "Começar a falar de um assunto. Também criar (filhos).", "📣", "work",
    [["Don't bring up politics at dinner.", "Não puxe assunto de política no jantar."], ["She brought up a good point.", "Ela levantou um bom ponto."], ["I was brought up in Betim.", "Eu fui criado em Betim."]],
    "Reuniões, conversas delicadas e origem.", ["mention (mencionar)", "raise (levantar uma questão)", "grow up (crescer)"]);
  W("drawback", "desvantagem", "DRÓ-bék", "substantivo", "Um ponto negativo de algo.", "➖", "work",
    [["The main drawback is the price.", "A principal desvantagem é o preço."], ["Every plan has drawbacks.", "Todo plano tem desvantagens."], ["What are the drawbacks of working from home?", "Quais são as desvantagens de trabalhar de casa?"]],
    "Comparações, decisões e reuniões.", ["disadvantage", "downside", "benefit (benefício)"]);
  W("keep up with", "acompanhar", "KÍIP ÂP uíth", "phrasal verb", "Manter o mesmo ritmo ou estar atualizado.", "🏃‍♂️", "daily",
    [["It's hard to keep up with the news.", "É difícil acompanhar as notícias."], ["Slow down, I can't keep up with you.", "Vai devagar, não consigo te acompanhar."], ["You need to keep up with new technologies.", "Você precisa se manter atualizado com novas tecnologias."]],
    "Trabalho, tecnologia e esportes.", ["catch up (alcançar)", "stay updated", "fall behind (ficar para trás)"]);
  W("likely", "provável", "LÁIK-li", "adjetivo / advérbio", "Algo que provavelmente vai acontecer.", "🎲", "daily",
    [["It's likely to rain today.", "É provável que chova hoje."], ["He'll likely be late.", "Ele provavelmente vai se atrasar."], ["That's not very likely.", "Isso não é muito provável."]],
    "Previsões, planos e probabilidades.", ["probably (provavelmente)", "unlikely (improvável)", "chance (chance)"]);

  /* ───────── C1 — Avançado ───────── */
  LV = "C1";
  W("nevertheless", "no entanto / mesmo assim", "né-ver-dhe-LÉS", "advérbio", "Conectivo formal para contraste.", "⚖️", "work",
    [["It was risky. Nevertheless, we did it.", "Era arriscado. Mesmo assim, nós fizemos."], ["The results were good; nevertheless, we can improve.", "Os resultados foram bons; no entanto, podemos melhorar."], ["She was tired but continued nevertheless.", "Ela estava cansada, mas continuou mesmo assim."]],
    "Textos formais, apresentações e argumentação.", ["however (porém)", "nonetheless (contudo)", "still (ainda assim)"]);
  W("leverage", "aproveitar / alavancar", "LÉ-ve-ridj", "verbo / substantivo", "Usar algo a seu favor para obter melhores resultados.", "🏗️", "work",
    [["We can leverage our experience.", "Podemos aproveitar nossa experiência."], ["Leverage data to make better decisions.", "Use os dados para tomar decisões melhores."], ["They have more leverage in the negotiation.", "Eles têm mais poder de barganha na negociação."]],
    "Negócios, estratégia e negociação.", ["take advantage of", "make the most of", "power (poder)"]);
  W("streamline", "simplificar / otimizar", "STRÍIM-láin", "verbo", "Tornar um processo mais simples e eficiente.", "🌀", "work",
    [["We need to streamline the process.", "Precisamos simplificar o processo."], ["The new system streamlined our workflow.", "O novo sistema otimizou nosso fluxo de trabalho."], ["Let's streamline the report.", "Vamos enxugar o relatório."]],
    "Gestão, TI e melhoria de processos.", ["optimize (otimizar)", "simplify (simplificar)", "workflow (fluxo de trabalho)"]);
  W("pinpoint", "identificar com precisão", "PÍN-póint", "verbo", "Encontrar a causa ou o local exato de algo.", "📍", "work",
    [["We couldn't pinpoint the cause of the error.", "Não conseguimos identificar a causa exata do erro."], ["Can you pinpoint the location on the map?", "Você pode apontar o local exato no mapa?"], ["It's hard to pinpoint when it started.", "É difícil dizer exatamente quando começou."]],
    "Diagnósticos, suporte técnico e análises.", ["identify (identificar)", "detect (detectar)", "narrow down (restringir)"]);
  W("compelling", "convincente / envolvente", "com-PÉ-lin", "adjetivo", "Muito convincente ou interessante, que prende a atenção.", "🧲", "work",
    [["She made a compelling argument.", "Ela apresentou um argumento convincente."], ["It's a compelling story.", "É uma história envolvente."], ["There's no compelling reason to change.", "Não há motivo forte para mudar."]],
    "Apresentações, argumentos e resenhas.", ["convincing (convincente)", "persuasive (persuasivo)", "engaging (envolvente)"]);
  W("trade-off", "concessão / custo-benefício", "TRÊID-óf", "substantivo", "Abrir mão de uma vantagem para obter outra.", "🔁", "work",
    [["There's a trade-off between speed and quality.", "Há uma troca entre velocidade e qualidade."], ["Every decision involves trade-offs.", "Toda decisão envolve concessões."], ["Is the trade-off worth it?", "Vale a pena essa troca?"]],
    "Decisões técnicas, negócios e planejamento.", ["compromise (meio-termo)", "pros and cons (prós e contras)", "balance (equilíbrio)"]);
  W("undermine", "minar / enfraquecer", "ân-der-MÁIN", "verbo", "Enfraquecer algo aos poucos, muitas vezes de forma indireta.", "🕳️", "work",
    [["Constant criticism undermines confidence.", "Críticas constantes minam a confiança."], ["Don't undermine your team.", "Não desautorize sua equipe."], ["The scandal undermined his reputation.", "O escândalo prejudicou a reputação dele."]],
    "Gestão de equipes, política e relacionamentos.", ["weaken (enfraquecer)", "sabotage (sabotar)", "support (apoiar)"]);
  W("nuance", "nuance / sutileza", "NÚU-âns", "substantivo", "Uma diferença sutil de significado, tom ou sentimento.", "🎨", "info",
    [["Translation loses some nuance.", "A tradução perde algumas nuances."], ["He understands the nuances of the language.", "Ele entende as sutilezas do idioma."], ["It's a nuanced issue.", "É uma questão cheia de nuances."]],
    "Discussões, idiomas e análises.", ["subtlety (sutileza)", "nuanced (matizado)", "detail (detalhe)"]);
  W("hindsight", "visão em retrospecto", "RÁIND-sáit", "substantivo", "Entender algo só depois que aconteceu. Comum em \"in hindsight\".", "🔙", "feelings",
    [["In hindsight, I should have waited.", "Olhando para trás, eu deveria ter esperado."], ["Hindsight is 20/20.", "Depois que acontece, é fácil saber."], ["With hindsight, it was a good decision.", "Em retrospecto, foi uma boa decisão."]],
    "Reflexões, retrospectivas e lições aprendidas.", ["looking back (olhando para trás)", "foresight (previsão)", "regret (arrependimento)"]);
  W("on the same page", "alinhados / de acordo", "ón dhe SÊIM PÊIDJ", "expressão", "Ter o mesmo entendimento sobre algo. Normalmente: \"to be on the same page\".", "📄", "work",
    [["Let's make sure we're on the same page.", "Vamos garantir que estamos alinhados."], ["We're not on the same page about the budget.", "Não estamos de acordo sobre o orçamento."], ["Good, now we're on the same page.", "Ótimo, agora estamos alinhados."]],
    "Reuniões, projetos e acordos.", ["aligned (alinhado)", "agree (concordar)", "get the picture (entender)"]);
  W("cut corners", "fazer de qualquer jeito", "CÂT CÓR-ners", "expressão", "Economizar tempo ou dinheiro sacrificando qualidade ou segurança.", "✂️", "work",
    [["Don't cut corners on security.", "Não economize na segurança."], ["They cut corners to finish on time.", "Eles fizeram de qualquer jeito para terminar no prazo."], ["We can't afford to cut corners.", "Não podemos nos dar ao luxo de fazer malfeito."]],
    "Projetos, obras e qualidade.", ["rush (apressar)", "do it properly (fazer direito)", "shortcut (atalho)"]);
  W("scrutinize", "examinar minuciosamente", "SCRÚU-ti-náiz", "verbo", "Analisar algo com muito cuidado e espírito crítico.", "🔬", "work",
    [["The auditors scrutinized every report.", "Os auditores examinaram cada relatório."], ["Her work is always scrutinized.", "O trabalho dela é sempre analisado de perto."], ["We need to scrutinize the data.", "Precisamos analisar os dados com cuidado."]],
    "Auditorias, análises e revisões.", ["scrutiny (escrutínio)", "examine (examinar)", "review (revisar)"]);
  W("feasible", "viável", "FÍI-zi-bol", "adjetivo", "Possível de ser feito na prática.", "🧱", "work",
    [["Is this plan feasible?", "Este plano é viável?"], ["It's not feasible within the budget.", "Não é viável dentro do orçamento."], ["We need a feasible solution.", "Precisamos de uma solução viável."]],
    "Projetos, orçamentos e planejamento.", ["viable (viável)", "feasibility study (estudo de viabilidade)", "realistic (realista)"]);
  W("come across", "deparar-se com / passar a impressão", "CÂM a-CRÓS", "phrasal verb", "Encontrar algo por acaso ou passar uma impressão.", "🧳", "info",
    [["I came across an old photo.", "Encontrei uma foto antiga por acaso."], ["He comes across as arrogant.", "Ele passa a impressão de ser arrogante."], ["Did you come across any problems?", "Você se deparou com algum problema?"]],
    "Histórias, impressões e descobertas.", ["run into (topar com)", "seem (parecer)", "find (encontrar)"]);
  W("take for granted", "não dar o devido valor / presumir", "TÊIK for GRÉN-tid", "expressão", "Achar que algo sempre estará ali e por isso não valorizar; ou presumir como certo.", "🎁", "feelings",
    [["Don't take your health for granted.", "Não deixe de valorizar sua saúde."], ["I took it for granted that you knew.", "Eu presumi que você sabia."], ["We often take our family for granted.", "Muitas vezes não damos valor à nossa família."]],
    "Reflexões, relacionamentos e conversas profundas.", ["appreciate (valorizar)", "assume (presumir)", "value (valorizar)"]);

  /* ───────── WORD IN ACTION ───────── */
  const WIA = [
    { w: "GET", ctx: [
      { label: "Chegar", scene: ["🏠", "🕕"], en: "I get home at 6 PM.", pt: "Eu chego em casa às 18h.", blank: "I ___ home at 6 PM.", ans: ["get"], note: "GET + lugar = chegar." },
      { label: "Ficar (mudança de estado)", scene: ["💼", "😩"], en: "I get tired after work.", pt: "Eu fico cansado depois do trabalho.", blank: "I ___ tired after work.", ans: ["get"], note: "GET + adjetivo = ficar (tired, angry, better)." },
      { label: "Pegar / buscar", scene: ["🥤", "🙏"], en: "Can you get me some water?", pt: "Você pode pegar um pouco de água para mim?", blank: "Can you ___ me some water?", ans: ["get"], note: "GET + objeto = pegar, buscar." },
      { label: "Entender", scene: ["💡", "👌"], en: "I get it now.", pt: "Agora eu entendi.", blank: "I ___ it now.", ans: ["get"], note: "\"I get it\" = entendi. Muito usado na conversa." } ] },
    { w: "TAKE", ctx: [
      { label: "Pegar transporte", scene: ["🚌", "🧍"], en: "I take the bus every morning.", pt: "Eu pego o ônibus toda manhã.", blank: "I ___ the bus every morning.", ans: ["take"], note: "TAKE + transporte = pegar." },
      { label: "Demorar", scene: ["⏱️", "🛣️"], en: "It takes 30 minutes to get there.", pt: "Leva 30 minutos para chegar lá.", blank: "It ___ 30 minutes to get there.", ans: ["takes"], note: "IT TAKES + tempo = demora / leva." },
      { label: "Tirar (foto)", scene: ["📸", "🗼"], en: "Can you take a picture of us?", pt: "Você pode tirar uma foto nossa?", blank: "Can you ___ a picture of us?", ans: ["take"], note: "TAKE a picture = tirar foto." } ] },
    { w: "MAKE", ctx: [
      { label: "Preparar", scene: ["☕", "🍳"], en: "I make coffee every morning.", pt: "Eu faço café toda manhã.", blank: "I ___ coffee every morning.", ans: ["make"], note: "MAKE = produzir, preparar." },
      { label: "Tomar decisão", scene: ["⚖️", "🧑‍💼"], en: "We need to make a decision.", pt: "Precisamos tomar uma decisão.", blank: "We need to ___ a decision.", ans: ["make"], note: "MAKE a decision = tomar uma decisão." },
      { label: "Fazer sentido", scene: ["🧩", "✅"], en: "That makes sense.", pt: "Isso faz sentido.", blank: "That ___ sense.", ans: ["makes"], note: "MAKE sense = fazer sentido." } ] },
    { w: "HAVE", ctx: [
      { label: "Possuir", scene: ["🐶", "🏡"], en: "I have a dog.", pt: "Eu tenho um cachorro.", blank: "I ___ a dog.", ans: ["have"], note: "HAVE = ter, possuir." },
      { label: "Refeições", scene: ["🥞", "🌅"], en: "We have breakfast at 7.", pt: "Nós tomamos café da manhã às 7.", blank: "We ___ breakfast at 7.", ans: ["have"], note: "HAVE + refeição = comer/tomar." },
      { label: "Obrigação", scene: ["📋", "⏰"], en: "I have to work tomorrow.", pt: "Eu tenho que trabalhar amanhã.", blank: "I ___ to work tomorrow.", ans: ["have"], note: "HAVE TO = ter que." } ] },
    { w: "LOOK", ctx: [
      { label: "Olhar", scene: ["👀", "🌄"], en: "Look at the sky!", pt: "Olhe para o céu!", blank: "___ at the sky!", ans: ["look"], note: "LOOK AT = olhar para." },
      { label: "Parecer", scene: ["🧑", "😊"], en: "You look happy today.", pt: "Você parece feliz hoje.", blank: "You ___ happy today.", ans: ["look"], note: "LOOK + adjetivo = parecer." },
      { label: "Procurar", scene: ["🔑", "🔍"], en: "I'm looking for my keys.", pt: "Estou procurando minhas chaves.", blank: "I'm ___ for my keys.", ans: ["looking"], note: "LOOK FOR = procurar." } ] },
    { w: "KEEP", ctx: [
      { label: "Continuar", scene: ["🏃", "➡️"], en: "Keep going!", pt: "Continue!", blank: "___ going!", ans: ["keep"], note: "KEEP + -ing = continuar fazendo." },
      { label: "Guardar", scene: ["🧾", "🗂️"], en: "Keep the receipt.", pt: "Guarde o recibo.", blank: "___ the receipt.", ans: ["keep"], note: "KEEP = guardar, ficar com." },
      { label: "Manter", scene: ["🤫", "🔒"], en: "Can you keep a secret?", pt: "Você consegue guardar um segredo?", blank: "Can you ___ a secret?", ans: ["keep"], note: "KEEP a secret / a promise = manter." } ] },
    { w: "RUN", ctx: [
      { label: "Correr", scene: ["🏃‍♀️", "🌳"], en: "I run in the park on Sundays.", pt: "Eu corro no parque aos domingos.", blank: "I ___ in the park on Sundays.", ans: ["run"], note: "RUN = correr." },
      { label: "Administrar", scene: ["🏪", "👩‍💼"], en: "She runs a small business.", pt: "Ela administra um pequeno negócio.", blank: "She ___ a small business.", ans: ["runs"], note: "RUN a business = administrar." },
      { label: "Funcionar / rodar", scene: ["💻", "⚙️"], en: "The program runs on Windows.", pt: "O programa roda no Windows.", blank: "The program ___ on Windows.", ans: ["runs"], note: "RUN = rodar, funcionar (máquinas, programas)." } ] },
    { w: "WORK", ctx: [
      { label: "Trabalhar", scene: ["🏢", "💻"], en: "I work at a hospital.", pt: "Eu trabalho em um hospital.", blank: "I ___ at a hospital.", ans: ["work"], note: "WORK = trabalhar." },
      { label: "Funcionar", scene: ["📱", "❌"], en: "My phone doesn't work.", pt: "Meu celular não funciona.", blank: "My phone doesn't ___.", ans: ["work"], note: "WORK = funcionar." },
      { label: "Dar certo", scene: ["📅", "👍"], en: "Does Monday work for you?", pt: "Segunda funciona para você?", blank: "Does Monday ___ for you?", ans: ["work"], note: "WORK FOR = ser conveniente para alguém." } ] }
  ];

  /* ───────── CONSTRUÇÃO DE FRASES ───────── */
  const STRUCTS = [
    { id: "svc", title: "Sujeito + verbo + complemento", tip: "A ordem básica do inglês é quase sempre: QUEM + FAZ O QUÊ + COMPLEMENTO. O sujeito nunca é omitido (em português dizemos \"Trabalho\", em inglês é \"I work\").",
      ex: [["I work every day.", "Eu trabalho todos os dias."], ["She likes coffee.", "Ela gosta de café."]],
      items: [
        { a: "I work every day.", pt: "Eu trabalho todos os dias.", why: "Sujeito (I) + verbo (work) + complemento (every day)." },
        { a: "We study English at night.", pt: "Nós estudamos inglês à noite.", why: "O complemento de tempo (at night) normalmente vai no final." },
        { a: "My brother lives in Betim.", pt: "Meu irmão mora em Betim.", why: "Sujeito com he/she/it: o verbo ganha -s (lives)." },
        { a: "They play soccer on Sundays.", pt: "Eles jogam futebol aos domingos.", why: "Sujeito + verbo + objeto + tempo." } ] },
    { id: "aff", title: "Frases afirmativas", tip: "No presente simples, com HE, SHE e IT o verbo ganha -S ou -ES. Com I, YOU, WE e THEY fica na forma básica.",
      ex: [["He works from home.", "Ele trabalha de casa."], ["It rains a lot here.", "Chove muito aqui."]],
      items: [
        { a: "He works from home.", pt: "Ele trabalha de casa.", why: "HE → works (com -s)." },
        { a: "She watches TV at night.", pt: "Ela assiste TV à noite.", why: "Verbos terminados em -ch ganham -es: watches." },
        { a: "The store opens at nine.", pt: "A loja abre às nove.", why: "The store = it → opens." } ] },
    { id: "neg", title: "Frases negativas", tip: "Use DON'T (do not) ou DOESN'T (does not, para he/she/it) antes do verbo. Com DOESN'T, o verbo perde o -S.",
      ex: [["I don't eat meat.", "Eu não como carne."], ["She doesn't like cold weather.", "Ela não gosta de frio."]],
      items: [
        { a: "I don't eat meat.", pt: "Eu não como carne.", why: "I + don't + verbo." },
        { a: "She doesn't like cold weather.", pt: "Ela não gosta de frio.", why: "SHE usa doesn't, e o verbo volta à forma básica (like, não likes)." },
        { a: "We don't have time now.", pt: "Nós não temos tempo agora.", why: "WE + don't + have." },
        { a: "He doesn't speak Spanish.", pt: "Ele não fala espanhol.", why: "HE + doesn't + speak (sem -s)." } ] },
    { id: "q", title: "Perguntas", tip: "No presente simples, a pergunta começa com DO ou DOES. Com palavras interrogativas: WHERE / WHAT / WHEN + do/does + sujeito + verbo.",
      ex: [["Do you speak English?", "Você fala inglês?"], ["Where does she work?", "Onde ela trabalha?"]],
      items: [
        { a: "Do you speak English?", pt: "Você fala inglês?", why: "DO + sujeito + verbo." },
        { a: "Where does she work?", pt: "Onde ela trabalha?", why: "WHERE + DOES + she + work (sem -s)." },
        { a: "What do you do?", pt: "O que você faz (profissão)?", why: "O primeiro DO é o auxiliar; o segundo é o verbo fazer." },
        { a: "Does he like pizza?", pt: "Ele gosta de pizza?", why: "DOES + he + like." } ] },
    { id: "aux", title: "Uso de auxiliares (can, will, should)", tip: "CAN (poder/conseguir), WILL (futuro), SHOULD (deveria). Depois deles, o verbo vai sem TO e sem -S.",
      ex: [["I can help you.", "Eu posso te ajudar."], ["You should rest.", "Você deveria descansar."]],
      items: [
        { a: "I can help you.", pt: "Eu posso te ajudar.", why: "CAN + verbo base (help)." },
        { a: "She will call you tomorrow.", pt: "Ela vai te ligar amanhã.", why: "WILL + verbo base, mesmo com SHE (call, não calls)." },
        { a: "You should drink more water.", pt: "Você deveria beber mais água.", why: "SHOULD + verbo base." },
        { a: "Can you open the window?", pt: "Você pode abrir a janela?", why: "Na pergunta, CAN vem antes do sujeito." } ] },
    { id: "tense", title: "Tempos verbais essenciais", tip: "Passado simples: verbo + -ED ou forma irregular (went, ate). Presente contínuo: AM/IS/ARE + -ING. Futuro: GOING TO + verbo. Present perfect: HAVE/HAS + particípio.",
      ex: [["I went to the beach yesterday.", "Eu fui à praia ontem."], ["I'm going to travel next month.", "Vou viajar mês que vem."]],
      items: [
        { a: "I went to the beach yesterday.", pt: "Eu fui à praia ontem.", why: "Passado de GO é WENT (irregular)." },
        { a: "She is working right now.", pt: "Ela está trabalhando agora.", why: "Presente contínuo: IS + working." },
        { a: "We are going to travel next month.", pt: "Nós vamos viajar mês que vem.", why: "Futuro planejado: ARE GOING TO + travel." },
        { a: "I have lived here for five years.", pt: "Eu moro aqui há cinco anos.", why: "Ação que começou no passado e continua: HAVE + lived + FOR." } ] },
    { id: "pron", title: "Pronomes", tip: "Sujeito: I, you, he, she, it, we, they. Objeto: me, you, him, her, it, us, them. Possessivo: my, your, his, her, its, our, their.",
      ex: [["She called me.", "Ela me ligou."], ["This is their car.", "Este é o carro deles."]],
      items: [
        { a: "She called me yesterday.", pt: "Ela me ligou ontem.", why: "Depois do verbo usamos pronome objeto: ME (não I)." },
        { a: "This is their car.", pt: "Este é o carro deles.", why: "THEIR = deles (possessivo)." },
        { a: "Can you help us?", pt: "Você pode nos ajudar?", why: "US = nos (objeto)." },
        { a: "I love my job.", pt: "Eu amo meu trabalho.", why: "MY = meu (possessivo)." } ] },
    { id: "prep", title: "Preposições (in, on, at)", tip: "AT para horas e lugares específicos (at 6 PM, at work). ON para dias (on Monday). IN para meses, anos, cidades e partes do dia (in July, in the morning).",
      ex: [["The meeting is on Monday.", "A reunião é na segunda."], ["I was born in 1990.", "Eu nasci em 1990."]],
      items: [
        { a: "The meeting is on Monday at 10.", pt: "A reunião é na segunda às 10.", why: "ON + dia da semana; AT + horário." },
        { a: "I live in Brazil.", pt: "Eu moro no Brasil.", why: "IN + país ou cidade." },
        { a: "She is at work now.", pt: "Ela está no trabalho agora.", why: "AT work = no trabalho (sem THE)." },
        { a: "I study in the morning.", pt: "Eu estudo de manhã.", why: "IN the morning / IN the afternoon, mas AT night." } ] }
  ];

  /* ───────── IDENTIFIQUE O ERRO ───────── */
  const ERRORS = [
    { s: "She don't like coffee.", bad: "don't", fix: "doesn't", ok: "She doesn't like coffee.", why: "Com SHE, HE e IT usamos DOESN'T." },
    { s: "I work with computer.", bad: "computer", fix: "computers", ok: "I work with computers.", why: "Falando de computadores em geral, usamos o plural." },
    { s: "He have two children.", bad: "have", fix: "has", ok: "He has two children.", why: "Com HE/SHE/IT, HAVE vira HAS." },
    { s: "I am agree with you.", bad: "am", fix: "(remova)", ok: "I agree with you.", why: "AGREE já é verbo. Não se usa AM antes dele." },
    { s: "I have 30 years.", bad: "have", fix: "am", ok: "I am 30 years old.", why: "Idade em inglês usa o verbo TO BE: I am 30." },
    { s: "Where you live?", bad: "you", fix: "do you", ok: "Where do you live?", why: "Perguntas no presente simples precisam do auxiliar DO." },
    { s: "She can speaks English.", bad: "speaks", fix: "speak", ok: "She can speak English.", why: "Depois de CAN o verbo vai na forma básica." },
    { s: "I went to home early.", bad: "to", fix: "(remova)", ok: "I went home early.", why: "Com HOME não usamos TO depois de verbos de movimento." },
    { s: "I didn't went to work.", bad: "went", fix: "go", ok: "I didn't go to work.", why: "Depois de DIDN'T o verbo volta à forma básica." },
    { s: "The people is nice here.", bad: "is", fix: "are", ok: "The people are nice here.", why: "PEOPLE é plural: usamos ARE." },
    { s: "I'm living here since 2020.", bad: "since", fix: "(use have lived)", ok: "I've lived here since 2020.", why: "Com SINCE, usamos o present perfect: I've lived." },
    { s: "Can you explain me this?", bad: "me", fix: "this to me", ok: "Can you explain this to me?", why: "EXPLAIN pede \"explain something TO someone\"." },
    { s: "Actually, I live in Betim since a year.", bad: "since", fix: "for", ok: "Actually, I've lived in Betim for a year.", why: "FOR com período de tempo; SINCE com ponto de início." },
    { s: "I look forward to see you.", bad: "see", fix: "seeing", ok: "I look forward to seeing you.", why: "LOOK FORWARD TO é seguido de verbo com -ING." },
    { s: "He is more tall than me.", bad: "more tall", fix: "taller", ok: "He is taller than me.", why: "Adjetivos curtos fazem comparativo com -ER." },
    { s: "I enjoy to cook.", bad: "to cook", fix: "cooking", ok: "I enjoy cooking.", why: "Depois de ENJOY, o verbo vai com -ING." },
    { s: "We discussed about the project.", bad: "about", fix: "(remova)", ok: "We discussed the project.", why: "DISCUSS não usa ABOUT." },
    { s: "She suggested me a hotel.", bad: "suggested me", fix: "suggested", ok: "She suggested a hotel.", why: "SUGGEST não aceita a pessoa logo depois. Diga \"suggested a hotel (to me)\"." }
  ];

  /* ───────── COMPLETE O DIÁLOGO ───────── */
  const DIALOGS = [
    { t: "At the Restaurant", lines: [["Waiter", "Are you ready to order?"], ["You", "___"]], opts: ["Yes, I'd like the chicken, please.", "Yes, I want eat chicken.", "Yes, give me chicken now."], a: 0, why: "\"I'd like...\" é a forma educada e natural de pedir." },
    { t: "Introducing Yourself", lines: [["Anna", "Hi! I'm Anna. Nice to meet you."], ["You", "___"]], opts: ["Nice to meet you too. I'm Paulo.", "I am fine, thanks.", "Me too nice."], a: 0, why: "A resposta padrão é \"Nice to meet you too\"." },
    { t: "Asking for Information", lines: [["You", "Excuse me, ___ the train station?"], ["Man", "It's two blocks from here."]], opts: ["where is", "where are", "how is"], a: 0, why: "Para perguntar localização de UMA coisa: \"Where is...?\"." },
    { t: "At Work", lines: [["Boss", "Can you send me the report by Friday?"], ["You", "___"]], opts: ["Sure, no problem.", "Sure, I sending.", "Yes, I am send it."], a: 0, why: "\"Sure, no problem\" é uma resposta natural e profissional." },
    { t: "Shopping", lines: [["Clerk", "Can I help you?"], ["You", "___"]], opts: ["I'm just looking, thanks.", "I'm just seeing, thanks.", "No, I see only."], a: 0, why: "Em lojas, \"I'm just looking\" = estou só olhando." },
    { t: "Traveling", lines: [["Officer", "What's the purpose of your visit?"], ["You", "___"]], opts: ["I'm here on vacation.", "I'm here for vacations of me.", "My purpose is travel."], a: 0, why: "\"I'm here on vacation / on business\" é a forma usual." },
    { t: "Daily Routine", lines: [["Friend", "What time do you usually wake up?"], ["You", "___"]], opts: ["I usually wake up at 6.", "I usually wake at the 6.", "Usually I am wake 6."], a: 0, why: "Horário: AT + hora, sem artigo." },
    { t: "Family and Friends", lines: [["Friend", "Do you have any brothers or sisters?"], ["You", "___"]], opts: ["Yes, I have one sister.", "Yes, I has one sister.", "Yes, there is one sister to me."], a: 0, why: "Com I usamos HAVE." },
    { t: "On the Phone", lines: [["Receptionist", "Good morning, how can I help you?"], ["You", "Hi, ___ speak to Mr. Smith?"]], opts: ["could I", "can I to", "I could"], a: 0, why: "Pedido educado: \"Could I speak to...?\"." },
    { t: "Unexpected Situations", lines: [["You", "Excuse me, I think I ___ my wallet on the bus."], ["Officer", "Let's fill out a report."]], opts: ["left", "forgot of", "lost of"], a: 0, why: "LEAVE (passado LEFT) = deixar algo em um lugar." }
  ];

  /* ───────── TESTE DE NIVELAMENTO ───────── */
  const PLACEMENT = [
    { q: "Complete: \"I ___ a student.\"", o: ["am", "is", "are", "be"], a: 0, lv: "A1" },
    { q: "Qual é a tradução de \"I need help\"?", o: ["Eu preciso de ajuda", "Eu quero ajudar", "Eu tenho ajuda", "Eu ajudei"], a: 0, lv: "A1" },
    { q: "Complete: \"She ___ in a hospital.\"", o: ["work", "works", "working", "is work"], a: 1, lv: "A1" },
    { q: "Complete: \"___ you like coffee?\"", o: ["Are", "Does", "Do", "Is"], a: 2, lv: "A2" },
    { q: "Complete: \"Yesterday I ___ to the cinema.\"", o: ["go", "gone", "went", "goes"], a: 2, lv: "A2" },
    { q: "\"Actually\" significa:", o: ["Atualmente", "Na verdade", "Eventualmente", "Realmente atual"], a: 1, lv: "B1" },
    { q: "Complete: \"I've lived here ___ 2019.\"", o: ["for", "since", "during", "from"], a: 1, lv: "B1" },
    { q: "Complete: \"If I ___ more time, I would travel.\"", o: ["have", "had", "will have", "having"], a: 1, lv: "B1" },
    { q: "\"We ran out of milk\" significa:", o: ["Corremos atrás do leite", "Acabou o leite", "Derramamos o leite", "Compramos leite"], a: 1, lv: "B2" },
    { q: "Complete: \"I look forward to ___ from you.\"", o: ["hear", "hearing", "heard", "to hear"], a: 1, lv: "B2" },
    { q: "Escolha a frase mais natural:", o: ["Despite of the rain, we went out.", "Despite the rain, we went out.", "Although the rain, we went out.", "Despite it rained, we went out."], a: 1, lv: "C1" },
    { q: "\"In hindsight\" significa:", o: ["À primeira vista", "Olhando para trás", "Daqui para frente", "Por precaução"], a: 1, lv: "C1" }
  ];

  /* ───────── CONVERSAÇÃO ───────── */
  const CONV = [
    { id: "intro", t: "Introducing Yourself", pt: "Apresentação pessoal", icon: "🙋", scene: "You just met someone new at a coworking space. The teacher plays a friendly new acquaintance." },
    { id: "work", t: "At Work", pt: "No trabalho", icon: "💼", scene: "A conversation with a coworker or manager about tasks, meetings and projects." },
    { id: "restaurant", t: "At the Restaurant", pt: "No restaurante", icon: "🍝", scene: "The teacher plays a waiter. The student orders food, asks questions and pays the bill." },
    { id: "travel", t: "Traveling", pt: "Viagens", icon: "✈️", scene: "Airport check-in, immigration and hotel reception. The teacher plays the staff." },
    { id: "shopping", t: "Shopping", pt: "Compras", icon: "🛍️", scene: "The teacher plays a store clerk. The student asks about sizes, prices and payment." },
    { id: "routine", t: "Daily Routine", pt: "Rotina", icon: "⏰", scene: "A relaxed chat about the student's daily routine, habits and weekends." },
    { id: "family", t: "Family and Friends", pt: "Família e amigos", icon: "👨‍👩‍👧", scene: "A friendly chat about family members, friends and social life." },
    { id: "info", t: "Asking for Information", pt: "Pedir informações", icon: "🗺️", scene: "The student is in a new city asking for directions, schedules and recommendations. The teacher plays a local." }
  ];

  window.EC_DATA = { WORDS, WIA, STRUCTS, ERRORS, DIALOGS, PLACEMENT, CONV,
    LEVELS: [
      { id: "A1", name: "Iniciante" }, { id: "A2", name: "Básico" }, { id: "B1", name: "Intermediário" },
      { id: "B2", name: "Intermediário avançado" }, { id: "C1", name: "Avançado" } ],
    TOPICS: { daily: "Dia a dia", work: "Trabalho", food: "Alimentação", travel: "Viagens", shopping: "Compras", family: "Família e amigos", feelings: "Sentimentos", info: "Informações" }
  };
})();
