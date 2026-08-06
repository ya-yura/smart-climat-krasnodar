"use client";

import { useMemo, useState } from "react";

const TELEGRAM_URL = "https://t.me/smartclimat123";
const GIS_URL = "https://2gis.ru/krasnodar/firm/70000001076833346";
const GIS_REVIEWS_URL =
  "https://2gis.ru/krasnodar/firm/70000001076833346/tab/reviews";

type SpaceId = "apartment" | "house" | "office";
type Step = 0 | 1 | 2;

const spaces: Array<{
  id: SpaceId;
  index: string;
  label: string;
  note: string;
  description: string;
}> = [
  {
    id: "apartment",
    index: "01",
    label: "Квартира",
    note: "одна комната или несколько",
    description: "Учитываем планировку, привычки и места, где важна тишина.",
  },
  {
    id: "house",
    index: "02",
    label: "Дом",
    note: "комфорт по зонам",
    description: "Собираем решение вокруг этажей, комнат и внешнего вида фасада.",
  },
  {
    id: "office",
    index: "03",
    label: "Офис",
    note: "рабочая среда",
    description: "Подбираем климат под рабочие места, режим и акустику помещения.",
  },
];

const areas = [
  "до 20 м²",
  "20–35 м²",
  "35–60 м²",
  "60+ м²",
];

const scenarios = [
  "Тишина и сон",
  "Быстро охладить комнату",
  "Комфорт для всей семьи",
  "Ровный климат для команды",
];

const faqs = [
  {
    question: "Поможете подобрать решение под площадь?",
    answer:
      "Да. Площадь — только первая точка. В подборе также важны планировка, солнечная сторона, количество людей и сценарий использования.",
  },
  {
    question: "Можно обратиться только за монтажом?",
    answer:
      "Можно описать задачу отдельно: монтаж уже выбранной системы или подбор решения вместе с установкой. Детали лучше обсудить напрямую в Telegram.",
  },
  {
    question: "Что нужно подготовить перед консультацией?",
    answer:
      "Достаточно знать тип помещения и примерную площадь. Если есть планировка, фото места установки или пожелания по шуму — они помогут сделать разговор точнее.",
  },
  {
    question: "Можно ли написать вместо звонка?",
    answer:
      "Да. Форма ниже собирает короткий контекст и открывает официальный Telegram-канал «Смарт-Климат», чтобы продолжить диалог там.",
  },
];

function scrollToSelection() {
  document.getElementById("selection")?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [space, setSpace] = useState<SpaceId>("apartment");
  const [area, setArea] = useState("");
  const [scenario, setScenario] = useState("");
  const [step, setStep] = useState<Step>(0);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const selectedSpace = spaces.find((item) => item.id === space);
  const ready = Boolean(area && scenario);

  const requestText = useMemo(
    () =>
      [
        "Здравствуйте! Хочу подобрать кондиционер и монтаж.",
        `Тип помещения: ${selectedSpace?.label ?? "не указан"}`,
        `Площадь: ${area || "не указана"}`,
        `Сценарий: ${scenario || "не указан"}`,
      ].join("\n"),
    [area, scenario, selectedSpace],
  );

  const nextStep = () => {
    if (step === 0) {
      setStep(1);
      return;
    }
    if (step === 1 && area) {
      setStep(2);
    }
  };

  const previousStep = () => {
    if (step > 0) {
      setStep((current) => (current - 1) as Step);
    }
  };

  const openTelegram = async () => {
    try {
      await navigator.clipboard.writeText(requestText);
      setCopied(true);
    } catch {
      setCopied(false);
    }
    setSent(true);
    window.open(TELEGRAM_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <main>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="Смарт-Климат — на главную">
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="brand-copy">
              <strong>Смарт-Климат</strong>
              <small>Краснодар</small>
            </span>
          </a>

          <nav className="main-nav" aria-label="Основная навигация">
            <a href="#solutions">Решения</a>
            <a href="#installation">Монтаж</a>
            <a href="#reputation">Репутация</a>
            <a href="#contacts">Контакты</a>
          </nav>

          <a className="header-telegram" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
            Telegram <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> Подбор • продажа • монтаж</div>
            <h1>
              Прохлада,
              <br />
              <em>рассчитанная</em>
              <br />
              на ваше пространство.
            </h1>
            <p className="hero-lead">
              Кондиционеры для квартиры, дома и офиса в Краснодаре — с подбором по помещению и понятным следующим шагом.
            </p>
            <div className="hero-actions">
              <button className="button button-primary" type="button" onClick={scrollToSelection}>
                Подобрать кондиционер и монтаж <span aria-hidden="true">↗</span>
              </button>
              <a className="text-link" href="#reputation">Смотреть репутацию <span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero-proof" aria-label="Данные компании">
              <span className="proof-item"><b>2ГИС</b> 5,0</span>
              <span className="proof-divider" aria-hidden="true" />
              <span className="proof-item">179 оценок</span>
              <span className="proof-divider" aria-hidden="true" />
              <span className="proof-item">Краснодар</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Схематичная визуализация климатической системы">
            <div className="visual-topline"><span>SMART / CLIMATE</span><span>01—24</span></div>
            <div className="visual-stage">
              <div className="air-path air-path-one"><span>↗</span></div>
              <div className="air-path air-path-two"><span>↗</span></div>
              <div className="unit-shadow" />
              <div className="ac-unit">
                <div className="ac-screen">24°</div>
                <div className="ac-slats"><i /><i /><i /><i /><i /><i /></div>
                <div className="ac-led" />
              </div>
              <div className="visual-label label-left"><span>ВНУТРЕННИЙ БЛОК</span><b>01</b></div>
              <div className="visual-label label-right"><b>02</b><span>ТИХИЙ ПОТОК</span></div>
              <div className="axis axis-one" /><div className="axis axis-two" />
            </div>
            <div className="visual-bottomline"><span>ПОД ВАШ СЦЕНАРИЙ</span><span className="visual-signal" aria-hidden="true">● ● ●</span></div>
          </div>
        </div>
        <div className="hero-scroll"><span>Листайте</span><i aria-hidden="true" /></div>
      </section>

      <section className="section intro-section">
        <div className="container intro-grid">
          <p className="section-kicker">01 / С чего начать</p>
          <div>
            <h2 className="display-heading">Не выбирайте по каталогу. <span>Сначала разберёмся в комнате.</span></h2>
            <p className="section-lead">Правильное решение начинается с контекста: где будет стоять система, кто ей пользуется и что для вас значит комфорт.</p>
          </div>
        </div>
      </section>

      <section className="section solutions-section" id="solutions">
        <div className="container">
          <div className="section-heading-row">
            <div><p className="section-kicker">02 / Решение под задачу</p><h2 className="section-heading">Один климатический запрос — разные сценарии.</h2></div>
            <p className="heading-aside">Квартира, дом или офис — начните с того, как пространство живёт в течение дня.</p>
          </div>
          <div className="solution-grid">
            {spaces.map((item) => (
              <article className={`solution-card solution-${item.id}`} key={item.id}>
                <div className="card-topline"><span>{item.index}</span><span className="card-arrow" aria-hidden="true">↗</span></div>
                <div className="solution-art" aria-hidden="true"><span className="art-room" /><span className="art-air art-air-a" /><span className="art-air art-air-b" /></div>
                <h3>{item.label}</h3>
                <p className="card-note">{item.note}</p>
                <p className="card-description">{item.description}</p>
                <a href="#selection" className="card-link" onClick={() => setSpace(item.id)}>Выбрать сценарий <span aria-hidden="true">→</span></a>
              </article>
            ))}
          </div>
          <div className="solutions-footnote"><span className="line-mark" aria-hidden="true" /><span>Подбираем не «самый мощный», а тот, который вписывается в реальную жизнь.</span></div>
        </div>
      </section>

      <section className="section selection-section" id="selection">
        <div className="container selection-grid">
          <div className="selection-intro">
            <p className="section-kicker">03 / Сценарий подбора</p>
            <h2 className="display-heading">Три вопроса — и следующий шаг <span>становится понятным.</span></h2>
            <p className="section-lead">Ответьте в удобном темпе. В конце откроется Telegram с уже собранным контекстом заявки.</p>
            <div className="selection-note"><span className="note-number">i</span><p>Цены, бренды и детали монтажа обсуждаются после понимания задачи — на сайте мы их не придумываем.</p></div>
          </div>

          <div className="selector-panel">
            <div className="selector-progress"><div className="progress-meta"><span>ПОДБОР РЕШЕНИЯ</span><b>0{step + 1} / 03</b></div><div className="progress-track"><span style={{ width: `${((step + 1) / 3) * 100}%` }} /></div></div>
            {step === 0 && <div className="selector-step"><p className="selector-question">Для какого пространства ищем систему?</p><div className="choice-list">{spaces.map((item) => <button type="button" key={item.id} className={`choice-row ${space === item.id ? "is-selected" : ""}`} onClick={() => setSpace(item.id)} aria-pressed={space === item.id}><span className="choice-index">{item.index}</span><span><strong>{item.label}</strong><small>{item.note}</small></span><span className="choice-state" aria-hidden="true">{space === item.id ? "●" : "○"}</span></button>)}</div><button className="button button-dark selector-button" type="button" onClick={nextStep}>Дальше <span aria-hidden="true">→</span></button></div>}
            {step === 1 && <div className="selector-step"><p className="selector-question">Какая площадь у помещения?</p><div className="choice-grid">{areas.map((item) => <button type="button" key={item} className={`choice-tile ${area === item ? "is-selected" : ""}`} onClick={() => setArea(item)} aria-pressed={area === item}>{item}</button>)}</div><div className="selector-controls"><button className="back-button" type="button" onClick={previousStep}>← Назад</button><button className="button button-dark selector-button" type="button" onClick={nextStep} disabled={!area}>Дальше <span aria-hidden="true">→</span></button></div></div>}
            {step === 2 && <div className="selector-step"><p className="selector-question">Что важнее всего в ежедневном сценарии?</p><div className="choice-list scenario-list">{scenarios.map((item, index) => <button type="button" key={item} className={`choice-row ${scenario === item ? "is-selected" : ""}`} onClick={() => setScenario(item)} aria-pressed={scenario === item}><span className="choice-index">0{index + 1}</span><span><strong>{item}</strong></span><span className="choice-state" aria-hidden="true">{scenario === item ? "●" : "○"}</span></button>)}</div><div className="selector-controls"><button className="back-button" type="button" onClick={previousStep}>← Назад</button><button className="button button-telegram selector-button" type="button" onClick={openTelegram} disabled={!ready}>Открыть Telegram <span aria-hidden="true">↗</span></button></div>{sent && <p className="selector-success" role="status">{copied ? "Запрос скопирован. Вставьте его в открывшемся Telegram." : "Telegram открыт — можно продолжить диалог."}</p>}</div>}
          </div>
        </div>
      </section>

      <section className="section installation-section" id="installation">
        <div className="container">
          <div className="section-heading-row install-heading-row"><div><p className="section-kicker">04 / Монтаж</p><h2 className="section-heading">Техника, которая не спорит с интерьером.</h2></div><p className="heading-aside">Монтаж — это не финальная галочка, а часть решения: от места блока до ощущения после запуска.</p></div>
          <div className="installation-layout">
            <div className="installation-diagram" aria-label="Схема монтажа кондиционера"><div className="diagram-wall" /><div className="diagram-inner"><span className="diagram-unit" /><span className="diagram-track" /><span className="diagram-outer" /></div><div className="diagram-caption"><span>01 / ВНУТРЕННИЙ БЛОК</span><span>02 / ТРАССА</span><span>03 / ВНЕШНИЙ БЛОК</span></div></div>
            <div className="install-points"><div className="install-point"><span>01</span><div><h3>Сначала — место и поток</h3><p>Чтобы воздух работал на комфорт, а не создавал лишний шум или сквозняк.</p></div></div><div className="install-point"><span>02</span><div><h3>Дальше — аккуратная логика трассы</h3><p>Внешний вид и техническая часть должны быть продуманы вместе.</p></div></div><div className="install-point"><span>03</span><div><h3>Финал — понятный запуск</h3><p>После установки важно проверить работу системы и обсудить базовый уход.</p></div></div><a href="#selection" className="underlined-link">Обсудить монтаж <span aria-hidden="true">↗</span></a></div>
          </div>
        </div>
      </section>

      <section className="section reputation-section" id="reputation">
        <div className="container reputation-grid">
          <div className="reputation-copy"><p className="section-kicker">05 / Подтверждённая репутация</p><h2 className="display-heading">Оценка, которую <span>можно проверить.</span></h2><p className="section-lead">Цифры ниже взяты из открытой карточки «Смарт-Климат» в 2ГИС. Без придуманных кейсов — только ссылка на источник.</p><a className="button button-outline" href={GIS_URL} target="_blank" rel="noreferrer">Открыть карточку 2ГИС <span aria-hidden="true">↗</span></a></div>
          <div className="rating-panel"><div className="rating-main"><span className="rating-label">РЕЙТИНГ 2ГИС</span><strong>5,0</strong><span className="stars" aria-label="Рейтинг 5 из 5">★★★★★</span></div><div className="rating-data"><div><strong>179</strong><span>оценок</span></div><div><strong>175</strong><span>отзывов</span></div><div><strong>2ГИС</strong><span>открытый источник</span></div></div><a className="rating-reviews-link" href={GIS_REVIEWS_URL} target="_blank" rel="noreferrer">Смотреть отзывы в 2ГИС <span aria-hidden="true">↗</span></a></div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container"><div className="section-heading-row"><div><p className="section-kicker">06 / Как это устроено</p><h2 className="section-heading">От вопроса до прохлады — без лишних кругов.</h2></div><p className="heading-aside">Небольшая последовательность, чтобы понимать, что произойдёт дальше.</p></div><ol className="process-list"><li><span className="process-number">01</span><div><h3>Рассказываете о помещении</h3><p>Тип, площадь, привычный сценарий и важные ограничения.</p></div><span className="process-line" aria-hidden="true" /></li><li><span className="process-number">02</span><div><h3>Получаете варианты</h3><p>Обсуждаем подходящее решение и его монтажную часть.</p></div><span className="process-line" aria-hidden="true" /></li><li><span className="process-number">03</span><div><h3>Согласовываете детали</h3><p>Фиксируем, что именно нужно сделать в вашем пространстве.</p></div><span className="process-line" aria-hidden="true" /></li><li><span className="process-number">04</span><div><h3>Запускаете систему</h3><p>Дальше остаётся пользоваться климатом, который подходит вам.</p></div></li></ol></div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="container faq-grid"><div><p className="section-kicker">07 / FAQ</p><h2 className="display-heading">Коротко о том, <span>что обычно важно.</span></h2></div><div className="faq-list">{faqs.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></div>
      </section>

      <section className="section contacts-section" id="contacts">
        <div className="container contact-grid"><div className="contact-copy"><p className="section-kicker">08 / Краснодар</p><h2 className="display-heading">Давайте соберём <span>ваш климатический сценарий.</span></h2><p className="section-lead">Напишите, если хотите подобрать кондиционер, монтаж или просто разобраться, с чего начать.</p><div className="contact-actions"><a className="button button-primary" href={TELEGRAM_URL} target="_blank" rel="noreferrer">Написать в Telegram <span aria-hidden="true">↗</span></a><a className="text-link dark-link" href={GIS_URL} target="_blank" rel="noreferrer">Проложить маршрут в 2ГИС <span aria-hidden="true">↗</span></a></div></div><div className="contact-side"><div className="address-block"><span className="address-label">АДРЕС</span><strong>Краснодар,<br />2-я Ямальская, 7</strong><span className="address-note">Открыть точку можно в карточке компании в 2ГИС.</span></div><div className="map-placeholder" aria-label="Схематичная карта района"><div className="map-grid" /><div className="map-road map-road-one" /><div className="map-road map-road-two" /><div className="map-pin"><span>SC</span></div><span className="map-label">2-я Ямальская, 7</span><a href={GIS_URL} target="_blank" rel="noreferrer" className="map-open">Открыть карту ↗</a></div></div></div>
      </section>

      <footer className="site-footer"><div className="container footer-inner"><a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true"><span /><span /><span /></span><span className="brand-copy"><strong>Смарт-Климат</strong><small>Подбор • продажа • монтаж</small></span></a><p>Краснодар · 2-я Ямальская, 7</p><a href={TELEGRAM_URL} target="_blank" rel="noreferrer">Telegram ↗</a><span className="footer-meta">© {new Date().getFullYear()} Смарт-Климат</span></div><div className="container footer-source">Данные о рейтинге и адресе: <a href={GIS_URL} target="_blank" rel="noreferrer">карточка 2ГИС</a> · <a href="https://t.me/smartclimat123" target="_blank" rel="noreferrer">официальный Telegram</a></div></footer>
    </main>
  );
}
