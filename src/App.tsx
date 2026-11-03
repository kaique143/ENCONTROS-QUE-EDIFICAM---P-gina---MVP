/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import heroMockup from "@/assets/uploads/14184.png";
import React, { useEffect, useRef, useState } from 'react';

 // 12 Themes list with emotional and contextual descriptions
const THEMES_LIST = [
  {
    id: 1,
    name: 'Curadas para Curar',
    subtitle: 'Feridas restauradas que se tornam instrumento de consolo para outras vidas.',
    img: '/images/tema_1_curadas_para_curar.webp',
    alt: 'Tema 1: Curadas para Curar',
  },
  {
    id: 2,
    name: 'Filhas do Rei',
    subtitle: 'Relembrando a dignidade, identidade e o valor inegociável de ser filha de Deus.',
    img: '/images/tema_2_filhas_do_rei.webp',
    alt: 'Tema 2: Filhas do Rei',
  },
  {
    id: 3,
    name: 'Florescendo no Tempo de Deus',
    subtitle: 'Paz para os dias de espera e encorajamento para florescer em cada estação.',
    img: '/images/tema_3_florescendo_no_tempo_de_deus.webp',
    alt: 'Tema 3: Florescendo no Tempo de Deus',
  },
  {
    id: 4,
    name: 'Escolhidas para um Propósito',
    subtitle: 'Despertando a certeza de que Deus chamou cada mulher com uma missão única.',
    img: '/images/tema_4_escolhidas_para_um_proposito.webp',
    alt: 'Tema 4: Escolhidas para um Propósito',
  },
  {
    id: 5,
    name: 'Quando Deus Está no Barco',
    subtitle: 'Segurança e calma para os momentos de tempestade, cansaço e ansiedade.',
    img: '/images/tema_5_quando_deus_esta_no_barco.webp',
    alt: 'Tema 5: Quando Deus Está no Barco',
  },
  {
    id: 6,
    name: 'Aos Pés de Jesus',
    subtitle: 'O valor de pausar o ativismo diário para escolher a boa parte na Sua presença.',
    img: '/images/tema_6_aos_pes_de_jesus.webp',
    alt: 'Tema 6: Aos Pés de Jesus',
  },
  {
    id: 7,
    name: 'Mulheres que Edificam Mulheres',
    subtitle: 'O poder da empatia, da intercessão e de caminhar juntas sem comparações.',
    img: '/images/tema_7_mulheres_que_edificam.webp',
    alt: 'Tema 7: Mulheres que Edificam Mulheres',
  },
  {
    id: 8,
    name: 'Enraizadas na Palavra',
    subtitle: 'Fincando raízes profundas nas Escrituras para permanecer firme diante dos ventos.',
    img: '/images/tema_8_enraizadas_na_palavra.webp',
    alt: 'Tema 8: Enraizadas na Palavra',
  },
  {
    id: 9,
    name: 'Transformadas pela Graça',
    subtitle: 'A liberdade de saber que a graça nos acolhe, perdoa e molda com ternura.',
    img: '/images/tema_9_transformadas_pela_graca.webp',
    alt: 'Tema 9: Transformadas pela Graça',
  },
  {
    id: 10,
    name: 'A Mulher Samaritana',
    subtitle: 'O encontro com Cristo que cura o passado e sacia com a água que nunca seca.',
    img: '/images/tema_10_a_mulher_samaritana.webp',
    alt: 'Tema 10: A Mulher Samaritana',
  },
  {
    id: 11,
    name: 'Nas Mãos do Oleiro',
    subtitle: 'Confiança e rendição enquanto o Pai molda pacientemente o nosso caráter.',
    img: '/images/tema_11_nas_maos_do_oleiro.webp',
    alt: 'Tema 11: Nas Mãos do Oleiro',
  },
  {
    id: 12,
    name: 'Um Coração que Confia em Deus',
    subtitle: 'Entregando medos, família e o futuro aos cuidados de Quem nunca falha.',
    img: '/images/tema_12_coracao_que_confia.webp',
    alt: 'Tema 12: Um Coração que Confia em Deus',
  },
];

 // Section 4: The 4 Moments Mechanism
const THE_4_MOMENTS = [
  {
    num: '01',
    title: 'ACOLHER',
    desc: 'Receber com intencionalidade, criando um ambiente seguro onde cada mulher se sinta acolhida, ouvida e valorizada desde o primeiro instante.',
  },
  {
    num: '02',
    title: 'ENVOLVER',
    desc: 'Estimular a participação através de dinâmicas e perguntas que abrem espaço para conversas reais, para que ninguém fique apenas em silêncio.',
  },
  {
    num: '03',
    title: 'EDIFICAR',
    desc: 'Alimentar a fé com uma reflexão bíblica relevante e contextualizada, lembrando que é a Palavra de Deus que sustenta e transforma vidas.',
  },
  {
    num: '04',
    title: 'APLICAR',
    desc: 'Ajudar cada mulher a conectar o ensinamento bíblico às decisões do dia a dia, nos relacionamentos, na família e nas suas lutas diárias.',
  },
];

// Section 5: Demonstration Cards
const DEMO_CARDS = [
  {
    tag: 'Roteiro em PDF',
    title: 'Capa do Material',
    desc: 'Identificação visual, tema do encontro e versículo central para alinhar a expectativa do grupo.',
    badge: 'Capa e Tema',
  },
  {
    tag: 'Guia Completo',
    title: 'Estrutura do Encontro',
    desc: 'Passo a passo organizado pelos 4 momentos para conduzir a reunião com ritmo e tranquilidade.',
    badge: 'Roteiro Guia',
  },
  {
    tag: 'Conexão Real',
    title: 'Página da Dinâmica',
    desc: 'Instruções simples, materiais fáceis e perguntas de transição para conectar com a mensagem.',
    badge: 'Dinâmica',
  },
  {
    tag: 'Palavra Fiel',
    title: 'Reflexão Bíblica',
    desc: 'Passagens das Escrituras, contexto histórico e tópicos claros para conduzir o momento da Palavra.',
    badge: 'Estudo Bíblico',
  },
  {
    tag: 'Comunhão & Oração',
    title: 'Perguntas e Aplicação',
    desc: 'Roda de conversa com perguntas direcionadas e encerramento em oração mútua.',
    badge: 'Aplicação Prática',
  },
];

// Section 11: FAQ
const FAQ_ITEMS = [
  {
    q: 'Como recebo o material?',
    a: 'O material é 100% digital. Assim que o pagamento for confirmado, você receberá instantaneamente um e-mail com os links seguros para baixar todos os arquivos em PDF no seu celular, tablet ou computador.',
  },
  {
    q: 'O material é físico?',
    a: 'Não. Você recebe os arquivos digitais em PDF em alta resolução. Você pode abrir direto no celular durante a reunião ou imprimir quantas vezes desejar.',
  },
  {
    q: 'Qual a diferença entre o Material Essencial e o Material Completo MAX?',
    a: 'O Material Essencial (R$ 12,90) inclui todos os 12 encontros femininos com roteiros de acolhimento, dinâmicas, reflexões bíblicas, perguntas para discussão e aplicações práticas. O Material Completo MAX (R$ 19,90) traz tudo do Essencial mais 3 bônus especiais para enriquecer a sua liderança: 30 Perguntas para Envolver as Mulheres, o Planejador da Líder de Célula e o Guia de Acolhimento de Visitantes.',
  },
  {
    q: 'Os 12 encontros estão completos?',
    a: 'Sim. Cada um dos 12 temas traz um roteiro completo de ponta a ponta: momento de acolher, dinâmica de interação, reflexão bíblica contextualizada, perguntas para compartilhar e aplicação prática com encerramento.',
  },
  {
    q: 'Preciso ter experiência prévia como líder para usar?',
    a: 'Não. O material foi escrito com linguagem pastoral clara e acolhedora, auxiliando tanto quem lidera há anos quanto quem está começando agora e deseja conduzir com mais segurança e preparo.',
  },
  {
    q: 'Posso adaptar os roteiros à realidade da minha igreja?',
    a: 'Com certeza. Os encontros foram fundamentados na Bíblia Sagrada e você tem total liberdade para adaptar o tempo, as dinâmicas e as ênfases doutrinárias conforme a visão da sua igreja local.',
  },
  {
    q: 'Posso utilizar o material em mais de um encontro ou ano que vem?',
    a: 'Sim. O acesso aos arquivos é seu. Você pode consultar os roteiros, revisitar os temas e utilizá-los quantas vezes quiser nos encontros do seu grupo ou ministério.',
  },
  {
    q: 'Preciso instalar algum programa para abrir?',
    a: 'Não. O formato PDF é universal e abre em qualquer celular (Android ou iPhone), tablet ou computador sem precisar instalar aplicativos complexos.',
  },
  {
    q: 'E se eu sentir que o material não é o que preciso?',
    a: 'Você conta com nossa garantia incondicional de 7 dias. Basta enviar um e-mail dentro desse prazo e devolveremos 100% do seu valor, com respeito e sem burocracia.',
  },
];

export default function App() {
  const [stickyVisible, setStickyVisible] = useState(false);
  const [activeLegal, setActiveLegal] = useState<'termos' | 'privacidade' | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const ofertaRef = useRef<HTMLElement>(null);

  // Sticky bottom bar intersection observer
  useEffect(() => {
    let heroVisible = true;
    let ofertaVisible = false;

    const updateSticky = () => {
      setStickyVisible(!heroVisible && !ofertaVisible);
    };

    const heroEl = heroRef.current;
    const ofertaEl = ofertaRef.current;

    let heroObserver: IntersectionObserver | null = null;
    let ofertaObserver: IntersectionObserver | null = null;

    if (heroEl && ofertaEl && 'IntersectionObserver' in window) {
      heroObserver = new IntersectionObserver((entries) => {
        heroVisible = entries[0].isIntersecting;
        updateSticky();
      });
      heroObserver.observe(heroEl);

      ofertaObserver = new IntersectionObserver(
        (entries) => {
          ofertaVisible = entries[0].isIntersecting;
          updateSticky();
        },
        { threshold: 0.15 }
      );
      ofertaObserver.observe(ofertaEl);
    }

    return () => {
      if (heroObserver && heroEl) heroObserver.unobserve(heroEl);
      if (ofertaObserver && ofertaEl) ofertaObserver.unobserve(ofertaEl);
    };
  }, []);

  // Listen to hash changes for legal sections or back
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#termos') {
        setActiveLegal('termos');
      } else if (hash === '#privacidade') {
        setActiveLegal('privacidade');
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const scrollToSection = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased selection:bg-[#7B3FC4]/20">
      {/* BARRA SUPERIOR (TOP BAR) — ROXO CLARO DELICADO */}
      <aside className="top-bar" aria-label="Aviso para líderes">
        💜 UM MATERIAL ESPECIAL PARA LÍDERES DE CÉLULAS E MINISTÉRIOS FEMININOS
      </aside>

      {/* SEÇÃO 1 — HERO / PRIMEIRA DOBRA */}
      <section id="hero" ref={heroRef} className="hero-section">
        <h1 className="hero-title">
          Encontros de mulheres que <em className="s">acolhem corações</em>, fortalecem a fé e deixam a <em className="s">Palavra de Deus</em> florescer na vida de cada uma.
        </h1>
        <p className="sub hero-description">
          Criado para ajudar você a conduzir momentos de comunhão, reflexão e edificação, com tudo organizado para tornar cada encontro mais significativo.
        </p>

        <figure className="hero-mockup">
          <img
            src={heroMockup}
            alt="Mockup do material Encontros que Edificam em tablet e cadernos"
          />
        </figure>

        <div className="cta-w hero-cta-wrap">
          <a
            className="cta hero-cta"
            href="#oferta"
            onClick={(e) => scrollToSection('oferta', e)}
          >
            💜 QUERO CONHECER O MATERIAL
          </a>
        </div>
        <p className="note hero-note">
          Material digital em PDF • Acesso imediato • Garantia de 7 dias
        </p>
      </section>

      {/* SEÇÃO 2 — APRESENTAÇÃO DOS TEMAS */}
      <section id="temas" style={{ paddingTop: '32px', maxWidth: '980px' }}>
        <h2>
          São <em className="s">12 encontros</em> para você acolher, envolver, edificar e aplicar.
        </h2>
        <p className="sub">
          Cada tema foi escolhido com sensibilidade espiritual para falar às dores, lutas e vitórias da mulher cristã. Você não precisa mais ficar horas procurando assuntos ou tentando criar perguntas sozinha: tenha uma direção clara e bíblica para cada momento do seu grupo.
        </p>

        {/* 12 Chips list */}
        <div className="chips">
          {THEMES_LIST.map((theme) => (
            <span key={theme.id}>
              {theme.id}. {theme.name}
            </span>
          ))}
        </div>

        {/* Infinite constant marquee showcasing the 12 themes with subtitles */}
        <div className="mq">
          <div className="mt">
            {THEMES_LIST.map((theme) => (
              <figure key={`t1-${theme.id}`}>
                <img loading="lazy" src={theme.img} alt={theme.alt} />
                <figcaption>
                  <span style={{ fontWeight: 700, display: 'block', color: 'var(--ink)' }}>
                    {theme.id}. {theme.name}
                  </span>
                  <span style={{ display: 'block', fontWeight: 400, color: 'var(--mut)', marginTop: '4px', fontSize: '0.8rem', lineHeight: 1.35 }}>
                    {theme.subtitle}
                  </span>
                </figcaption>
              </figure>
            ))}
            {/* Duplicate for smooth infinite looping */}
            {THEMES_LIST.map((theme) => (
              <figure key={`t2-${theme.id}`} aria-hidden="true">
                <img loading="lazy" src={theme.img} alt="" />
                <figcaption>
                  <span style={{ fontWeight: 700, display: 'block', color: 'var(--ink)' }}>
                    {theme.id}. {theme.name}
                  </span>
                  <span style={{ display: 'block', fontWeight: 400, color: 'var(--mut)', marginTop: '4px', fontSize: '0.8rem', lineHeight: 1.35 }}>
                    {theme.subtitle}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="cta-w">
          <a className="cta" href="#oferta" onClick={(e) => scrollToSection('oferta', e)}>
            💜 QUERO FACILITAR MEUS ENCONTROS
          </a>
        </div>
      </section>


      {/* SEÇÃO 4 — MECANISMO DIFERENCIADOR */}
      <section id="mecanismo">
        <h2>
          O método dos 4 momentos: do <em className="s">acolhimento à prática</em> cotidiana.
        </h2>
        <p className="sub">
          Preparar uma célula toda semana exige amor e dedicação: orar pelas ovelhas, escolher a mensagem certa, pensar em como quebrar a timidez e levar o ensinamento para a vida real. Por isso, cada roteiro segue a sequência dos quatro momentos:
        </p>

        <div className="mechanism-grid">
          {THE_4_MOMENTS.map((moment) => (
            <div className="moment-card" key={moment.num}>
              <div className="moment-num">{moment.num}. {moment.title}</div>
              <h3>{moment.title}</h3>
              <p>{moment.desc}</p>
            </div>
          ))}
        </div>

        <p className="sub" style={{ marginTop: '28px', fontWeight: 600, color: 'var(--ink)' }}>
          Assim, você não precisa improvisar. Você se dedica ao que mais importa: olhar nos olhos das mulheres que Deus colocou ao seu redor e ministrar a graça de Cristo.
        </p>
      </section>

      {/* SEÇÃO 5 — DEMONSTRAÇÃO DO MATERIAL */}
      <section id="demonstracao" style={{ maxWidth: '980px' }}>
        <h2>
          Veja como os roteiros são <em className="s">organizados</em> para você.
        </h2>
        <p className="sub">
          Arquivos digitais em PDF com diagramação limpa, elegante e prática para você consultar no celular, tablet ou imprimir para levar ao encontro.
        </p>

        <div className="docs-grid">
          {DEMO_CARDS.map((doc, idx) => (
            <div className="doc-card" key={idx}>
              <div className="doc-preview">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--g)',
                      background: 'rgba(255,255,255,0.9)',
                      padding: '3px 8px',
                      borderRadius: '999px',
                    }}
                  >
                    {doc.tag}
                  </span>
                  <span style={{ fontSize: '1rem', opacity: 0.7 }}>📄</span>
                </div>

                {/* Formatted document representation */}
                <div
                  style={{
                    margin: 'auto 0',
                    background: 'rgba(255,255,255,0.85)',
                    padding: '12px 10px',
                    borderRadius: '8px',
                    border: '1px dashed var(--gb)',
                    boxShadow: '0 2px 8px -2px rgba(123,63,196,0.1)',
                  }}
                >
                  <div style={{ height: '6px', width: '60%', background: 'var(--g)', borderRadius: '3px', marginBottom: '8px' }}></div>
                  <div style={{ height: '4px', width: '90%', background: 'var(--line)', borderRadius: '2px', marginBottom: '5px' }}></div>
                  <div style={{ height: '4px', width: '80%', background: 'var(--line)', borderRadius: '2px', marginBottom: '5px' }}></div>
                  <div style={{ height: '4px', width: '70%', background: 'var(--line)', borderRadius: '2px' }}></div>
                </div>

                <div
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--mut)',
                    textAlign: 'center',
                    fontWeight: 600,
                    background: 'rgba(255,255,255,0.7)',
                    padding: '4px 6px',
                    borderRadius: '6px',
                  }}
                >
                  {doc.badge}
                </div>
              </div>
              <div className="b">
                <h3>{doc.title}</h3>
                <p>{doc.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="cta-w">
          <a className="cta" href="#oferta" onClick={(e) => scrollToSection('oferta', e)}>
            💜 QUERO FACILITAR MEUS ENCONTROS
          </a>
        </div>
      </section>

      {/* SEÇÃO 6 — PARA QUEM É */}
      <section id="para-quem">
        <h2>
          Este material foi pensado para você <em className="s">que…</em>
        </h2>
        <div className="list">
          <div className="it c">
            <span className="ic">✓</span>
            <span>Lidera ou auxilia uma célula, grupo de discipulado ou ministério feminino da sua igreja.</span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Entende a responsabilidade de cuidar de vidas e deseja alimentar a fé das participantes com a Palavra.</span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Sente a rotina corrida e muitas vezes fica sem tempo de criar roteiros do zero durante a semana.</span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Deseja acolher novas mulheres com carinho, fazendo com que elas se sintam em casa e queiram voltar.</span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Sonha em ver as participantes se abrindo mais, orando umas pelas outras e crescendo juntas.</span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Busca mais tranquilidade, foco e segurança na preparação de cada encontro.</span>
          </div>
        </div>

        <p className="mid" style={{ marginTop: '48px' }}>Propósito e Clareza:</p>
        <div className="list" style={{ marginTop: '18px' }}>
          <div className="it c no">
            <span className="ic no">ℹ️</span>
            <span>
              Este material não é um curso teológico abstrato nem decoração física. É um recurso digital de apoio prático e pastoral, criado para tornar seus encontros de mulheres mais intencionais, vivos e fundamentados na Palavra.
            </span>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7 — RESUMO DO QUE VOCÊ RECEBE */}
      <section id="resumo" className="summary-section" style={{ maxWidth: '900px' }}>
        <span className="summary-eyebrow">SEU MATERIAL, PASSO A PASSO</span>
        <h2>
          Tudo preparado para você <em className="s">liderar com leveza</em>.
        </h2>
        <p className="sub">Ao adquirir o Encontros que Edificam hoje, você recebe:</p>

        <div className="list summary-list" style={{ maxWidth: '780px', marginTop: '28px' }}>
          <div className="it c">
            <span className="ic">✓</span>
            <span><b>12 encontros femininos completos e estruturados.</b></span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span><b>12 temas bíblicos essenciais para a caminhada da mulher cristã.</b></span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Sugestões de acolhimento e abertura para quebrar o gelo com carinho.</span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Dinâmicas de interação criadas especificamente para cada mensagem.</span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Reflexões bíblicas prontas para conduzir a Palavra com firmeza e clareza.</span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Perguntas reflexivas que incentivam o compartilhamento mútuo e sincero.</span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Aplicações práticas para o dia a dia e sugestões de oração.</span>
          </div>
        </div>

        <p className="sub summary-note" style={{ marginTop: '24px', fontWeight: 700, color: 'var(--g)' }}>
          Pagamento único <span aria-hidden="true">•</span> Sem mensalidades <span aria-hidden="true">•</span> Acesso vitalício aos arquivos
        </p>
      </section>

      {/* SEÇÃO 8 — OFERTA E PREÇO */}
      <section id="oferta" ref={ofertaRef} style={{ maxWidth: '940px' }}>
        <h2>
          Seus próximos 12 encontros podem ser marcados por <em className="s">comunhão e propósito</em>.
        </h2>
        <p className="sub">
          Escolha a melhor opção para abençoar o seu ministério. Pagamento único, sem mensalidades, com acesso imediato.
        </p>

        <div className="plans">
          {/* CARD 1 — MATERIAL ESSENCIAL */}
          <div className="plan">
            <span className="plan-kicker">12 encontros completos</span>
            <h3 style={{ fontSize: '1.35rem' }}>Material Essencial</h3>
            <p className="for">Para quem deseja ter os 12 encontros completos e organizados.</p>
            <ul>
              <li>
                <span className="ic">✓</span>
                <span><b>12 encontros femininos completos.</b></span>
              </li>
              <li>
                <span className="ic">✓</span>
                <span>Roteiros de acolhimento e abertura.</span>
              </li>
              <li>
                <span className="ic">✓</span>
                <span>Dinâmicas relacionadas aos temas.</span>
              </li>
              <li>
                <span className="ic">✓</span>
                <span>Reflexões bíblicas organizadas.</span>
              </li>
              <li>
                <span className="ic">✓</span>
                <span>Perguntas para discussão em grupo.</span>
              </li>
              <li>
                <span className="ic">✓</span>
                <span>Aplicações práticas e oração.</span>
              </li>
            </ul>
            <hr />
            <div className="price">
              <p className="lbl">Pagamento único</p>
              <b>R$ 12,90</b>
              <small>Acesso ao material digital em PDF.</small>
            </div>

          </div>

          {/* CARD 2 — MATERIAL COMPLETO MAX */}
          <div className="plan best">
            <span className="ribbon">MAIS RECOMENDADO</span>
            <span className="plan-kicker">12 encontros + 3 bônus</span>
            <h3 style={{ fontSize: '1.45rem', marginTop: '4px' }}>Material Completo MAX</h3>
            <p className="for">
              Tudo do Material Essencial + 3 bônus especiais para facilitar a preparação e condução dos encontros.
            </p>
            <ul>
              <li>
                <span className="ic">✓</span>
                <span><b>Todos os 12 encontros femininos completos.</b></span>
              </li>
              <li>
                <span className="ic">✓</span>
                <span>Roteiros de acolhimento e abertura.</span>
              </li>
              <li>
                <span className="ic">✓</span>
                <span>Dinâmicas relacionadas aos temas.</span>
              </li>
              <li>
                <span className="ic">✓</span>
                <span>Reflexões bíblicas organizadas.</span>
              </li>
              <li>
                <span className="ic">✓</span>
                <span>Perguntas para discussão em grupo.</span>
              </li>
              <li>
                <span className="ic">✓</span>
                <span>Aplicações práticas e oração.</span>
              </li>
              <li className="bonus-item">
                <span className="bonus-title">
                  <span className="bonus-icon" aria-hidden="true">🎁</span>
                  <span><small>BÔNUS EXCLUSIVO · 1</small>30 Perguntas para Envolver as Mulheres</span>
                </span>
                <span className="bonus-desc">Perguntas prontas para estimular conversas profundas, compartilhar experiências e aproximar os corações.</span>
              </li>
              <li className="bonus-item">
                <span className="bonus-title">
                  <span className="bonus-icon" aria-hidden="true">🎁</span>
                  <span><small>BÔNUS EXCLUSIVO · 2</small>Planejador da Líder de Célula</span>
                </span>
                <span className="bonus-desc">Material prático para organizar temas, datas, escalas e a preparação de cada encontro com tranquilidade.</span>
              </li>
              <li className="bonus-item">
                <span className="bonus-title">
                  <span className="bonus-icon" aria-hidden="true">🎁</span>
                  <span><small>BÔNUS EXCLUSIVO · 3</small>Guia de Acolhimento de Visitantes</span>
                </span>
                <span className="bonus-desc">Orientações práticas para receber novas participantes com carinho e ajudá-las a se sentirem em família.</span>
              </li>
            </ul>
            <hr />
            <div className="price">
              <p className="lbl">Pagamento único</p>
              <b>R$ 19,90</b>
              <small>Acesso completo ao material + 3 bônus em PDF.</small>
            </div>

          </div>
        </div>

        <p className="trust" style={{ marginTop: '22px' }}>
          Acesso imediato após a confirmação do pagamento • Garantia incondicional de 7 dias.
        </p>
      </section>

      {/* SEÇÃO 9 — COMO FUNCIONA */}
      <section id="como">
        <h2>
          É simples <em className="s">começar</em>.
        </h2>
        <div className="steps" style={{ margin: '36px auto 0' }}>
          <div className="stp">
            <b>1</b>
            <h3>ESCOLHA SEU PLANO</h3>
            <p>Selecione o Material Essencial ou o Completo MAX e faça o pagamento em ambiente seguro.</p>
          </div>
          <div className="stp">
            <b>2</b>
            <h3>RECEBA O ACESSO</h3>
            <p>Imediatamente após a aprovação, você recebe o acesso aos PDFs no seu e-mail.</p>
          </div>
          <div className="stp">
            <b>3</b>
            <h3>ESCOLHA O TEMA</h3>
            <p>Consulte os 12 encontros e selecione aquele que conversa com a estação atual do seu grupo.</p>
          </div>
          <div className="stp">
            <b>4</b>
            <h3>CONDUZA COM PAZ</h3>
            <p>Utilize a sequência dos 4 momentos para liderar um encontro acolhedor, vivo e edificante.</p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 10 — GARANTIA */}
      <section id="garantia" style={{ maxWidth: '1040px' }}>
        <div className="gr">
          <svg viewBox="0 0 320 260" role="img" aria-label="Selo de garantia de 7 dias">
            <defs>
              <linearGradient id="gd" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f6df8a" />
                <stop offset=".5" stopColor="#d9a92e" />
                <stop offset="1" stopColor="#a97a14" />
              </linearGradient>
            </defs>
            <path
              d="M10 95H112V175H10L40 135Z"
              fill="#2a1838"
              stroke="url(#gd)"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M310 95H208V175H310L280 135Z"
              fill="#2a1838"
              stroke="url(#gd)"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <polygon
              points="257,175 200,232 120,232 63,175 63,95 120,38 200,38 257,95"
              fill="url(#gd)"
              stroke="#a97a14"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="160" cy="135" r="76" fill="#2a1838" stroke="url(#gd)" strokeWidth="5" />
            <circle
              cx="160"
              cy="135"
              r="66"
              fill="none"
              stroke="url(#gd)"
              strokeWidth="1.5"
              opacity=".6"
            />
            <text
              x="160"
              y="152"
              textAnchor="middle"
              fontFamily="Inter,sans-serif"
              fontSize="88"
              fontWeight="800"
              fill="url(#gd)"
            >
              7
            </text>
            <text
              x="160"
              y="186"
              textAnchor="middle"
              fontFamily="Inter,sans-serif"
              fontSize="24"
              fontWeight="800"
              fill="url(#gd)"
            >
              DIAS
            </text>
            <text x="102" y="130" textAnchor="middle" fontSize="14" fill="#d9a92e">
              ★
            </text>
            <text x="218" y="130" textAnchor="middle" fontSize="14" fill="#d9a92e">
              ★
            </text>
          </svg>

          <div>
            <h2>Você tem 7 dias para conhecer o material com tranquilidade.</h2>
            <p>
              Queremos que você tome essa decisão com total paz no coração, certa de que este material abençoará o seu ministério.
            </p>
            <p>
              Por isso, sua aquisição conta com uma <b>garantia incondicional de 7 dias</b>.
            </p>
            <p>
              Baixe os roteiros, leia as reflexões bíblicas e analise as dinâmicas. Se, dentro desse prazo, você perceber que o material não atende ao que esperava, poderá solicitar o reembolso integral com apenas uma mensagem.
            </p>
            <p style={{ fontWeight: 600, color: 'var(--ink)' }}>
              Você conhece o material sem precisar assumir todo o risco da decisão.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 11 — PERGUNTAS FREQUENTES */}
      <section id="faq">
        <h2>
          Perguntas <em className="s">frequentes</em>.
        </h2>
        <p className="sub">Tire suas dúvidas e sinta-se segura para abençoar seu grupo.</p>

        <div className="list" style={{ maxWidth: '640px' }}>
          {FAQ_ITEMS.map((item, idx) => (
            <details key={idx}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* SEÇÃO 12 — FECHAMENTO FINAL */}
      <section id="final" style={{ paddingBottom: '96px' }}>
        <h2>
          O próximo encontro que você vai preparar pode ser o <em className="s">recomeço</em> para uma mulher.
        </h2>
        <p className="sub">
          Cada mulher que chega ao seu encontro traz uma história, um anseio e uma necessidade real do amor de Deus.
        </p>
        <p className="sub" style={{ marginTop: '10px' }}>
          Você não precisa continuar começando do zero toda semana com o peso de fazer tudo sozinha. Tenha 12 roteiros amorosos e fundamentados na Palavra para guiar cada passo da sua liderança.
        </p>

        {/* Box da oferta final */}
        <div className="close-box">
          <div style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.14em', color: 'var(--g)', textTransform: 'uppercase' }}>
            Acesso Imediato
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '4px' }}>
            ENCONTROS QUE EDIFICAM
          </h3>
          <p style={{ color: 'var(--mut)', margin: '4px 0 14px', fontSize: '0.96rem' }}>
            12 encontros femininos prontos para acolher, envolver e edificar.
          </p>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--g)', letterSpacing: '-0.02em', lineHeight: 1 }}>
            A partir de R$ 12,90
          </div>
          <div className="cta-w" style={{ marginTop: '18px' }}>
            <a className="cta" href="#oferta" onClick={(e) => scrollToSection('oferta', e)}>
              💜 VER OS PLANOS E GARANTIR
            </a>
          </div>
          <p className="note" style={{ marginTop: '12px', fontSize: '0.82rem' }}>
            Material digital em PDF • Pagamento único • Garantia de 7 dias.
          </p>
        </div>
      </section>

      {/* TERMOS DE USO */}
      {(activeLegal === 'termos' || (typeof window !== 'undefined' && window.location.hash === '#termos')) && (
        <section className="legal" id="termos" aria-labelledby="t-termos" style={{ display: 'block' }}>
          <h2 id="t-termos">Termos de uso</h2>
          <h3>O que você está adquirindo</h3>
          <p>
            Arquivos digitais em PDF com 12 roteiros completos para encontros de células e ministérios femininos, contendo acolhimento, dinâmicas de interação, reflexões bíblicas, perguntas de compartilhamento e aplicações práticas.
          </p>
          <h3>Uso permitido</h3>
          <p>
            Você pode utilizar os roteiros nos encontros do seu grupo, célula ou ministério feminino da sua igreja quantas vezes quiser.
          </p>
          <h3>Uso não permitido</h3>
          <p>
            Não é permitido revender, compartilhar, publicar ou redistribuir os arquivos digitalmente ou de forma comercial.
          </p>
          <h3>Garantia e reembolso</h3>
          <p>
            Você pode pedir o reembolso integral em até 7 dias após a compra, conforme as condições apresentadas na compra e o direito de arrependimento previsto no Código de Defesa do Consumidor.
          </p>
          <a
            className="back"
            href="#hero"
            onClick={(e) => {
              scrollToSection('hero', e);
              setActiveLegal(null);
            }}
          >
            Voltar ao início
          </a>
        </section>
      )}

      {/* POLÍTICA DE PRIVACIDADE */}
      {(activeLegal === 'privacidade' || (typeof window !== 'undefined' && window.location.hash === '#privacidade')) && (
        <section className="legal" id="privacidade" aria-labelledby="t-priv" style={{ display: 'block' }}>
          <h2 id="t-priv">Política de privacidade</h2>
          <h3>Dados que tratamos</h3>
          <ul>
            <li>Dados informados na compra (como nome, e-mail e pagamento), tratados de forma segura pela plataforma de pagamento.</li>
            <li>Dados de navegação nesta página, como origem do acesso, por meio de cookies e ferramentas analíticas padrão.</li>
          </ul>
          <h3>Para que usamos</h3>
          <p>Para enviar o acesso aos arquivos digitais, prestar suporte e cumprir obrigações legais.</p>
          <h3>Compartilhamento</h3>
          <p>Os dados são compartilhados estritamente com a plataforma de pagamento para processamento da compra. Nunca vendemos seus dados.</p>
          <h3>Seus direitos</h3>
          <p>
            Nos termos da LGPD (Lei 13.709/2018), você pode solicitar esclarecimentos ou exclusão de dados através do canal de suporte do produto.
          </p>
          <a
            className="back"
            href="#hero"
            onClick={(e) => {
              scrollToSection('hero', e);
              setActiveLegal(null);
            }}
          >
            Voltar ao início
          </a>
        </section>
      )}

      {/* MOBILE STICKY CTA BAR */}
      <div className={`sticky ${stickyVisible ? 'on' : ''}`} id="sticky" aria-hidden={!stickyVisible}>
        <div>
          <small>A partir de</small>
          <b>R$ 12,90</b>
        </div>
        <a className="cta" href="#oferta" onClick={(e) => scrollToSection('oferta', e)} tabIndex={stickyVisible ? 0 : -1}>
          VER OS PLANOS
        </a>
      </div>

      {/* FOOTER */}
      <footer>
        <p>© 2026 Encontros que Edificam. Material digital em PDF para líderes e ministérios femininos.</p>
        <p>
          <a
            href="#termos"
            onClick={(e) => {
              e.preventDefault();
              setActiveLegal('termos');
              setTimeout(() => {
                const el = document.getElementById('termos');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
          >
            Termos de uso
          </a>
          <a
            href="#privacidade"
            onClick={(e) => {
              e.preventDefault();
              setActiveLegal('privacidade');
              setTimeout(() => {
                const el = document.getElementById('privacidade');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
          >
            Política de privacidade
          </a>
        </p>
      </footer>
    </div>
  );
}
