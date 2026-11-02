/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';

// Checkout plans configuration
const CHECKOUT_PLANS = {
  essencial: {
    url: 'https://ggcheckout.app/checkout/v5/a2976748-fc15-4227-98b8-a5c7c2e3aef1',
    name: 'Material Essencial - Encontros que Edificam',
    value: 12.90,
  },
  completo: {
    url: 'https://ggcheckout.app/checkout/v5/aa63ac91-2777-4fb3-82c5-30d3dae193bd',
    name: 'Material Completo MAX - Encontros que Edificam',
    value: 19.90,
  },
};

// 12 Themes list
const THEMES_LIST = [
  { id: 1, name: 'Curadas para Curar', img: '/images/tema_1_curadas_para_curar.webp', alt: 'Tema 1: Curadas para Curar' },
  { id: 2, name: 'Filhas do Rei', img: '/images/tema_2_filhas_do_rei.webp', alt: 'Tema 2: Filhas do Rei' },
  { id: 3, name: 'Florescendo no Tempo de Deus', img: '/images/tema_3_florescendo_no_tempo_de_deus.webp', alt: 'Tema 3: Florescendo no Tempo de Deus' },
  { id: 4, name: 'Escolhidas para um Propósito', img: '/images/tema_4_escolhidas_para_um_proposito.webp', alt: 'Tema 4: Escolhidas para um Propósito' },
  { id: 5, name: 'Quando Deus Está no Barco', img: '/images/tema_5_quando_deus_esta_no_barco.webp', alt: 'Tema 5: Quando Deus Está no Barco' },
  { id: 6, name: 'Aos Pés de Jesus', img: '/images/tema_6_aos_pes_de_jesus.webp', alt: 'Tema 6: Aos Pés de Jesus' },
  { id: 7, name: 'Mulheres que Edificam Mulheres', img: '/images/tema_7_mulheres_que_edificam.webp', alt: 'Tema 7: Mulheres que Edificam Mulheres' },
  { id: 8, name: 'Enraizadas na Palavra', img: '/images/tema_8_enraizadas_na_palavra.webp', alt: 'Tema 8: Enraizadas na Palavra' },
  { id: 9, name: 'Transformadas pela Graça', img: '/images/tema_9_transformadas_pela_graca.webp', alt: 'Tema 9: Transformadas pela Graça' },
  { id: 10, name: 'A Mulher Samaritana', img: '/images/tema_10_a_mulher_samaritana.webp', alt: 'Tema 10: A Mulher Samaritana' },
  { id: 11, name: 'Nas Mãos do Oleiro', img: '/images/tema_11_nas_maos_do_oleiro.webp', alt: 'Tema 11: Nas Mãos do Oleiro' },
  { id: 12, name: 'Um Coração que Confia em Deus', img: '/images/tema_12_coracao_que_confia.webp', alt: 'Tema 12: Um Coração que Confia em Deus' },
];

// Section 3: 5 Blocks that make up each meeting
const MEETING_BLOCKS = [
  {
    icon: '🌷',
    title: 'ACOLHIMENTO E ABERTURA',
    desc: 'Uma sugestão para iniciar o encontro, aproximar as participantes e introduzir o tema.',
  },
  {
    icon: '💬',
    title: 'DINÂMICA DE INTERAÇÃO',
    desc: 'Uma atividade relacionada ao assunto para estimular a participação e criar oportunidades de conversa.',
  },
  {
    icon: '📖',
    title: 'REFLEXÃO BÍBLICA',
    desc: 'Uma mensagem organizada a partir de uma passagem das Escrituras, com contexto e ensinamentos relacionados ao tema.',
  },
  {
    icon: '❤️',
    title: 'PERGUNTAS PARA COMPARTILHAR',
    desc: 'Perguntas para ajudar as participantes a refletir e conversar sobre o que aprenderam.',
  },
  {
    icon: '🙏',
    title: 'APLICAÇÃO E ENCERRAMENTO',
    desc: 'Uma proposta prática para levar o ensinamento para o cotidiano, com sugestão de encerramento e oração.',
  },
];

// Section 4: The 4 Moments Mechanism
const THE_4_MOMENTS = [
  {
    num: '01',
    title: 'ACOLHER',
    desc: 'Comece criando um ambiente receptivo para as mulheres.',
  },
  {
    num: '02',
    title: 'ENVOLVER',
    desc: 'Estimule a participação com atividades e perguntas relacionadas ao tema.',
  },
  {
    num: '03',
    title: 'EDIFICAR',
    desc: 'Conduza uma reflexão fundamentada na Palavra de Deus.',
  },
  {
    num: '04',
    title: 'APLICAR',
    desc: 'Ajude o grupo a conectar o ensinamento bíblico à vida cotidiana.',
  },
];

// Section 5: Demonstration Cards (structured placeholders ready for new product pages)
const DEMO_CARDS = [
  {
    tag: 'Roteiro em PDF',
    title: 'Capa do Material',
    desc: 'Identificação visual, título do encontro e passagem bíblica central de cada tema.',
    badge: 'Capa do tema',
  },
  {
    tag: 'Estrutura Completa',
    title: 'Página de um Roteiro',
    desc: 'Passo a passo com os 4 momentos organizados para conduzir a reunião.',
    badge: 'Roteiro guia',
  },
  {
    tag: 'Atividade Prática',
    title: 'Página da Dinâmica',
    desc: 'Materiais necessários, objetivo, instruções e perguntas de conexão.',
    badge: 'Dinâmica',
  },
  {
    tag: 'Estudo das Escrituras',
    title: 'Página da Reflexão Bíblica',
    desc: 'Texto bíblico, contexto histórico, ensinamentos práticos e tópicos de condução.',
    badge: 'Mensagem',
  },
  {
    tag: 'Comunhão & Oração',
    title: 'Perguntas e Aplicação',
    desc: 'Perguntas para compartilhar em grupo e proposta prática para a semana.',
    badge: 'Aplicação',
  },
];

// Section 11: FAQ
const FAQ_ITEMS = [
  {
    q: 'Como recebo o material?',
    a: 'O material é digital. Após a confirmação do pagamento, você recebe as instruções de acesso por e-mail ou pelo canal definido na compra.',
  },
  {
    q: 'O material é físico?',
    a: 'Não. Você recebe arquivos digitais em PDF.',
  },
  {
    q: 'Os 12 encontros estão completos?',
    a: 'Cada tema é apresentado com roteiro de acolhimento, dinâmica, reflexão bíblica, perguntas e aplicação prática.',
  },
  {
    q: 'Preciso ter experiência como líder?',
    a: 'Não. O material foi pensado para auxiliar tanto líderes experientes quanto mulheres que estão começando a conduzir encontros.',
  },
  {
    q: 'Posso adaptar os encontros à minha igreja?',
    a: 'Sim. Você pode adaptar a condução, as perguntas e as atividades à realidade do seu grupo e às orientações doutrinárias da sua igreja.',
  },
  {
    q: 'Posso utilizar o material em mais de um encontro?',
    a: 'Sim. Os roteiros podem ser consultados novamente e utilizados em diferentes reuniões do seu grupo, respeitando os termos de uso do material.',
  },
  {
    q: 'Qual a diferença entre o Material Essencial e o Material Completo MAX?',
    a: 'O Material Essencial (R$ 12,90) inclui todos os 12 encontros femininos com roteiros de acolhimento, dinâmicas, reflexões bíblicas, perguntas para discussão e aplicações práticas. O Material Completo MAX (R$ 19,90) traz tudo do Essencial mais 3 bônus especiais: 30 Perguntas para Envolver as Mulheres, Planejador da Líder de Célula e o Guia de Acolhimento de Visitantes.',
  },
  {
    q: 'Preciso instalar algum programa?',
    a: 'Não. Os arquivos em PDF podem ser abertos em dispositivos compatíveis com esse formato.',
  },
  {
    q: 'E se eu não gostar?',
    a: 'Você conta com garantia de 7 dias, conforme as condições apresentadas na compra.',
  },
];

export default function App() {
  const [isVideoUnmuted, setIsVideoUnmuted] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [activeLegal, setActiveLegal] = useState<'termos' | 'privacidade' | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const ofertaRef = useRef<HTMLElement>(null);

  // Propagates incoming query strings (UTMs, tracking IDs) to the checkout URL
  const buildCheckoutUrl = (baseUrl: string) => {
    if (typeof window === 'undefined') return baseUrl;
    const qs = window.location.search.replace(/^\?/, '');
    if (!qs) return baseUrl;
    const sep = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${sep}${qs}`;
  };

  const handleCheckout = (planKey: 'essencial' | 'completo', e: React.MouseEvent) => {
    e.preventDefault();
    const plan = CHECKOUT_PLANS[planKey];
    const url = buildCheckoutUrl(plan.url);

    // Track Facebook Pixel if initialized
    try {
      const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
      if (typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout', {
          content_name: plan.name,
          value: plan.value,
          currency: 'BRL',
        });
      }
    } catch {
      // Ignored
    }

    setTimeout(() => {
      window.location.href = url;
    }, 250);
  };

  // Video sound un-mute handler
  const handleUnmuteVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.volume = 0.5;
      videoRef.current.muted = false;
      videoRef.current.loop = false;
      videoRef.current.controls = true;
      const playPromise = videoRef.current.play();
      if (playPromise) {
        playPromise.catch(() => {});
      }
      setIsVideoUnmuted(true);

      try {
        const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
        if (typeof fbq === 'function') {
          fbq('trackCustom', 'VSLPlay');
        }
      } catch {
        // Ignored
      }
    }
  };

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
      {/* SEÇÃO 1 — HERO / PRIMEIRA DOBRA */}
      <section id="hero" ref={heroRef} style={{ paddingTop: '36px', maxWidth: '980px' }}>
        <span className="pill">💜 PARA LÍDERES DE CÉLULAS E MINISTÉRIOS FEMININOS</span>
        <h1>
          Sua próxima célula pode ser muito mais do que <em className="s">uma reunião da semana</em>.
        </h1>
        <p className="sub" style={{ fontWeight: 600, color: 'var(--ink)' }}>
          12 encontros femininos prontos para acolher, envolver e edificar mulheres na Palavra de Deus.
        </p>
        <p className="sub" style={{ marginTop: '12px' }}>
          Tenha temas e roteiros organizados para conduzir momentos de comunhão, participação e reflexão bíblica, sem precisar passar horas planejando tudo do zero.
        </p>

        {/* Lista de benefícios */}
        <div className="hero-benefits">
          <div className="hb-item">
            <span>📖</span>
            <span>12 temas para escolher</span>
          </div>
          <div className="hb-item">
            <span>🌷</span>
            <span>Atividades e perguntas para envolver</span>
          </div>
          <div className="hb-item">
            <span>🙏</span>
            <span>Reflexões bíblicas e aplicações práticas</span>
          </div>
          <div className="hb-item">
            <span>💜</span>
            <span>Roteiros organizados para sua preparação</span>
          </div>
        </div>

        {/* VSL VIDEO CONTAINER */}
        <div className={`vsl ${isVideoUnmuted ? 'on' : ''}`} id="vsl" style={{ marginTop: '32px' }}>
          <video
            ref={videoRef}
            id="vslv"
            src="https://i.imgur.com/oQofA95.mp4"
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            preload="auto"
          />
          {!isVideoUnmuted && (
            <button
              className="vsl-on"
              id="vslon"
              type="button"
              aria-label="Ativar o som"
              onClick={handleUnmuteVideo}
            >
              <span className="vsl-ic">🔊</span>
              <b>Toque para ativar o som</b>
            </button>
          )}
        </div>

        <div className="cta-w">
          <a className="cta" href="#temas" onClick={(e) => scrollToSection('temas', e)}>
            QUERO CONHECER OS 12 ENCONTROS
          </a>
        </div>
        <p className="note">Material digital em PDF • Acesso imediato após a confirmação do pagamento • Garantia de 7 dias.</p>
      </section>

      {/* SEÇÃO 2 — APRESENTAÇÃO DOS TEMAS */}
      <section id="temas" style={{ maxWidth: '980px' }}>
        <h2>
          São <em className="s">12 encontros</em> para você escolher e preparar.
        </h2>
        <p className="sub">
          Cada encontro aborda um tema especial da caminhada cristã feminina, com uma proposta de reflexão bíblica e atividades para ajudar você a conduzir o momento com propósito.
        </p>
        <p className="sub" style={{ marginTop: '12px' }}>
          Você não precisa ficar procurando um assunto, inventando perguntas ou tentando organizar tudo sozinha. Escolha o tema que combina com o momento do seu grupo e tenha uma direção para conduzir o encontro.
        </p>

        {/* 12 Chips list */}
        <div className="chips">
          {THEMES_LIST.map((theme) => (
            <span key={theme.id}>
              {theme.id}. {theme.name}
            </span>
          ))}
        </div>

        {/* Infinite constant marquee showcasing the 12 themes */}
        <div className="mq">
          <div className="mt">
            {THEMES_LIST.map((theme) => (
              <figure key={`t1-${theme.id}`}>
                <img loading="lazy" src={theme.img} alt={theme.alt} />
                <figcaption>
                  {theme.id}. {theme.name}
                </figcaption>
              </figure>
            ))}
            {/* Duplicate for smooth infinite looping */}
            {THEMES_LIST.map((theme) => (
              <figure key={`t2-${theme.id}`} aria-hidden="true">
                <img loading="lazy" src={theme.img} alt="" />
                <figcaption>
                  {theme.id}. {theme.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="cta-w">
          <a className="cta" href="#oferta" onClick={(e) => scrollToSection('oferta', e)}>
            QUERO VER OS 12 ENCONTROS
          </a>
        </div>
      </section>

      {/* SEÇÃO 3 — O QUE VEM EM CADA ENCONTRO */}
      <section id="incluso" style={{ maxWidth: '980px' }}>
        <h2>
          Cada tema vem com um roteiro para <em className="s">conduzir do começo ao fim</em>.
        </h2>
        <p className="sub">
          Não são apenas ideias soltas para você tentar encaixar na reunião. Cada encontro foi pensado para ajudar você a organizar os diferentes momentos da célula.
        </p>

        <div className="pg">
          {MEETING_BLOCKS.map((block, i) => (
            <div className="pc" key={i}>
              <div className="ph" style={{ display: 'grid', placeItems: 'center', background: 'var(--tint)' }}>
                <span style={{ fontSize: '3rem' }}>{block.icon}</span>
              </div>
              <div className="b">
                <h3 style={{ fontSize: '0.95rem' }}>{block.title}</h3>
                <p>{block.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="cta-w">
          <a className="cta" href="#oferta" onClick={(e) => scrollToSection('oferta', e)}>
            QUERO MEUS 12 ROTEIROS
          </a>
        </div>
      </section>

      {/* SEÇÃO 4 — MECANISMO DIFERENCIADOR */}
      <section id="mecanismo">
        <h2>
          Não é apenas uma lista de dinâmicas. É uma <em className="s">direção para o encontro</em>.
        </h2>
        <p className="sub">
          Sabemos que preparar uma célula toda semana exige dedicação. É preciso pensar no tema, escolher uma passagem bíblica, encontrar uma atividade e organizar a maneira de conduzir a conversa.
        </p>
        <p className="sub" style={{ marginTop: '10px' }}>
          Por isso, os encontros seguem uma sequência de quatro momentos:
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
          Assim, você tem uma estrutura para preparar encontros com mais direção, sem precisar improvisar cada etapa.
        </p>
      </section>

      {/* SEÇÃO 5 — DEMONSTRAÇÃO DO MATERIAL */}
      <section id="demonstracao" style={{ maxWidth: '980px' }}>
        <h2>
          Veja o que você vai encontrar no <em className="s">Encontros que Edificam</em>.
        </h2>
        <p className="sub">
          Você recebe os arquivos digitais organizados para consultar durante a preparação e utilizar na condução das reuniões.
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
            QUERO TER ACESSO AO MATERIAL
          </a>
        </div>
      </section>

      {/* SEÇÃO 6 — PARA QUEM É */}
      <section id="para-quem">
        <h2>
          Este material é para você <em className="s">que…</em>
        </h2>
        <div className="list">
          <div className="it c">
            <span className="ic">✓</span>
            <span>Lidera ou auxilia uma célula feminina na sua igreja.</span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Faz parte do ministério de mulheres.</span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Precisa preparar encontros semanais e às vezes fica sem ideias.</span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Deseja estimular mais conversas e participação entre as mulheres.</span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Quer trabalhar temas bíblicos de maneira organizada e prática.</span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Deseja ter mais tranquilidade na preparação e condução dos encontros.</span>
          </div>
        </div>

        <p className="mid" style={{ marginTop: '48px' }}>Importante:</p>
        <div className="list" style={{ marginTop: '18px' }}>
          <div className="it c no">
            <span className="ic no">ℹ️</span>
            <span>
              Este material não é para quem procura uma decoração física ou um curso teológico aprofundado. É um recurso digital de apoio para a preparação de encontros femininos.
            </span>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7 — RESUMO DO QUE VOCÊ RECEBE */}
      <section id="resumo" style={{ maxWidth: '780px' }}>
        <h2>
          Tudo organizado para <em className="s">facilitar sua preparação</em>.
        </h2>
        <p className="sub">Ao adquirir o Encontros que Edificam, você recebe:</p>

        <div className="list" style={{ maxWidth: '600px', marginTop: '28px' }}>
          <div className="it c">
            <span className="ic">✓</span>
            <span><b>12 encontros femininos completos.</b></span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span><b>12 temas com referências bíblicas.</b></span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Sugestões de acolhimento e abertura.</span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Dinâmicas relacionadas a cada tema.</span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Reflexões bíblicas organizadas.</span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Perguntas para estimular a participação.</span>
          </div>
          <div className="it c">
            <span className="ic">✓</span>
            <span>Aplicações práticas e sugestões de encerramento.</span>
          </div>
        </div>

        <p className="sub" style={{ marginTop: '24px', fontWeight: 700, color: 'var(--g)' }}>
          Pagamento único. Sem mensalidade.
        </p>
      </section>

      {/* SEÇÃO 8 — OFERTA E PREÇO */}
      <section id="oferta" ref={ofertaRef} style={{ maxWidth: '940px' }}>
        <h2>
          Seus próximos 12 encontros podem começar com <em className="s">muito mais direção</em>.
        </h2>
        <p className="sub">
          Imagine não precisar começar do zero toda vez que chegar o dia da célula. Você escolhe o tema, consulta o roteiro e organiza seu encontro com muito mais praticidade.
        </p>

        <div className="plans">
          {/* CARD 1 — MATERIAL ESSENCIAL */}
          <div className="plan">
            <h3 style={{ fontSize: '1.35rem' }}>Material Essencial</h3>
            <p className="for">Para quem deseja ter os encontros completos e organizados.</p>
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
                <span>Reflexões bíblicas.</span>
              </li>
              <li>
                <span className="ic">✓</span>
                <span>Perguntas para discussão.</span>
              </li>
              <li>
                <span className="ic">✓</span>
                <span>Aplicações práticas.</span>
              </li>
            </ul>
            <hr />
            <div className="price">
              <p className="lbl">Pagamento único</p>
              <b>R$ 12,90</b>
              <small>Acesso ao material digital em PDF.</small>
            </div>
            <div className="cta-w">
              <a
                className="cta ghost"
                href={buildCheckoutUrl(CHECKOUT_PLANS.essencial.url)}
                onClick={(e) => handleCheckout('essencial', e)}
              >
                QUERO O ESSENCIAL
              </a>
            </div>
          </div>

          {/* CARD 2 — MATERIAL COMPLETO MAX */}
          <div className="plan best">
            <span className="ribbon">MAIS RECOMENDADO</span>
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
                <span>Reflexões bíblicas.</span>
              </li>
              <li>
                <span className="ic">✓</span>
                <span>Perguntas para discussão.</span>
              </li>
              <li>
                <span className="ic">✓</span>
                <span>Aplicações práticas.</span>
              </li>
              <li style={{ background: 'var(--tint)', padding: '10px 14px', borderRadius: '14px', border: '1px solid var(--gb)', flexDirection: 'column', gap: '3px' }}>
                <span style={{ fontWeight: 800, color: 'var(--g)', fontSize: '0.88rem' }}>🎁 BÔNUS 1 — 30 Perguntas para Envolver as Mulheres</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--mut)', lineHeight: 1.4 }}>Perguntas prontas para estimular conversas, compartilhar experiências e aprofundar a comunhão.</span>
              </li>
              <li style={{ background: 'var(--tint)', padding: '10px 14px', borderRadius: '14px', border: '1px solid var(--gb)', flexDirection: 'column', gap: '3px' }}>
                <span style={{ fontWeight: 800, color: 'var(--g)', fontSize: '0.88rem' }}>🎁 BÔNUS 2 — Planejador da Líder de Célula</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--mut)', lineHeight: 1.4 }}>Material para organizar temas, datas, materiais e preparação dos encontros.</span>
              </li>
              <li style={{ background: 'var(--tint)', padding: '10px 14px', borderRadius: '14px', border: '1px solid var(--gb)', flexDirection: 'column', gap: '3px' }}>
                <span style={{ fontWeight: 800, color: 'var(--g)', fontSize: '0.88rem' }}>🎁 BÔNUS 3 — Guia de Acolhimento de Visitantes</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--mut)', lineHeight: 1.4 }}>Sugestões práticas para receber novas participantes e ajudá-las a se sentirem incluídas.</span>
              </li>
            </ul>
            <hr />
            <div className="price">
              <p className="lbl">Pagamento único</p>
              <b>R$ 19,90</b>
              <small>Acesso completo ao material + 3 bônus em PDF.</small>
            </div>
            <div className="cta-w">
              <a
                className="cta"
                href={buildCheckoutUrl(CHECKOUT_PLANS.completo.url)}
                onClick={(e) => handleCheckout('completo', e)}
              >
                💜 QUERO O COMPLETO MAX
              </a>
            </div>
          </div>
        </div>

        <p className="trust" style={{ marginTop: '22px' }}>
          Acesso imediato após a confirmação do pagamento • Garantia de 7 dias.
        </p>
      </section>

      {/* SEÇÃO 9 — COMO FUNCIONA */}
      <section id="como">
        <h2>
          É simples <em className="s">começar</em>.
        </h2>
        <div className="steps" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', maxWidth: '720px', margin: '36px auto 0' }}>
          <div className="stp">
            <b>1</b>
            <h3>ESCOLHA SEU MATERIAL</h3>
            <p>Clique no botão e realize o pagamento com segurança.</p>
          </div>
          <div className="stp">
            <b>2</b>
            <h3>RECEBA SEUS ARQUIVOS</h3>
            <p>Após a confirmação, você recebe as instruções de acesso ao material digital.</p>
          </div>
          <div className="stp">
            <b>3</b>
            <h3>ESCOLHA O TEMA</h3>
            <p>Consulte os 12 encontros e escolha aquele que deseja trabalhar com seu grupo.</p>
          </div>
          <div className="stp">
            <b>4</b>
            <h3>PREPARE SUA CÉLULA</h3>
            <p>Utilize o roteiro para organizar e conduzir o encontro.</p>
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
            <h2>Você tem 7 dias para conhecer o material.</h2>
            <p>
              Queremos que você tenha tranquilidade na hora de adquirir o <b>Encontros que Edificam</b>.
            </p>
            <p>
              Por isso, sua compra conta com uma garantia de 7 dias.
            </p>
            <p>
              Se, dentro desse prazo, você perceber que o material não atende ao que esperava, poderá solicitar o reembolso conforme as condições da compra.
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
        <p className="sub">Tire suas dúvidas antes de garantir seu material.</p>

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
          Sua próxima célula pode ser um momento especial de <em className="s">comunhão e edificação</em>.
        </h2>
        <p className="sub">
          Você não precisa continuar começando do zero toda semana.
        </p>
        <p className="sub" style={{ marginTop: '10px' }}>
          Tenha 12 temas e roteiros organizados para ajudar você a acolher, envolver e compartilhar a Palavra com as mulheres da sua igreja.
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
            12 encontros femininos prontos para conduzir.
          </p>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--g)', letterSpacing: '-0.02em', lineHeight: 1 }}>
            A partir de R$ 12,90
          </div>
          <div className="cta-w" style={{ marginTop: '18px' }}>
            <a className="cta" href="#oferta" onClick={(e) => scrollToSection('oferta', e)}>
              💜 QUERO PREPARAR MEUS ENCONTROS
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
