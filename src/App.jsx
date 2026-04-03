import { useState, useEffect, useRef } from 'react'
import './index.css'

/* ─── Shared UI Atoms ─── */
const Label = ({ children, className = '' }) => (
  <span className={`font-typewriter uppercase text-[11px] tracking-[0.15em] opacity-60 ${className}`}>{children}</span>
)

const SectionTag = ({ children, color = 'var(--color-gold)' }) => (
  <div className="flex items-center gap-2 mb-6">
    <div className="w-2 h-2 rounded-full" style={{ background: color }} />
    <Label>{children}</Label>
  </div>
)

const GoldDivider = () => (
  <div className="w-full flex items-center gap-4 my-8 opacity-30">
    <div className="flex-1 border-t border-dashed border-[var(--color-gold)]" />
    <svg className="w-3 h-3 text-[var(--color-gold)]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5z" /></svg>
    <div className="flex-1 border-t border-dashed border-[var(--color-gold)]" />
  </div>
)

const PaperCard = ({ children, className = '', bg = 'var(--color-warm-gray)', rotate = '0deg', style = {} }) => (
  <div className={`paper-texture rounded-lg shadow-xl border border-black/5 ${className}`} style={{ background: bg, transform: `rotate(${rotate})`, ...style }}>
    {children}
  </div>
)

/* ─── Noise Overlay ─── */
const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='nf'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23nf)'/%3E%3C/svg%3E")` }} />
)

/* ─── Sidebar ─── */
function Sidebar() {
  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-[var(--color-gold)]/30 flex flex-col justify-between p-8 lg:p-10 bg-[var(--color-paper)] lg:sticky lg:top-0 lg:h-screen z-20">
      <div className="flex flex-col gap-6">
        <div className="space-y-3">
          <h1 className="text-5xl lg:text-6xl font-light leading-[0.9] text-[var(--color-emerald)]">
            Up<br /><span className="ml-6 italic">pora</span>
          </h1>
          <p className="font-typewriter text-sm leading-relaxed opacity-70 max-w-[200px]">
            QR-донаты для авторов<br />
            Комиссия 4,5%<br />
            Россия, 2026
          </p>
        </div>
      </div>
      <nav className="hidden lg:flex flex-col gap-3 mt-auto">
        {['Калькулятор', 'Сравнение', 'Юр. модель', 'FAQ', 'Заявка'].map((item, i) => (
          <a key={item} href={`#section-${i}`} className="font-typewriter uppercase text-[10px] tracking-widest hover:text-[var(--color-emerald)] transition-colors flex items-center gap-2 opacity-60 hover:opacity-100">
            <div className="w-1 h-1 bg-[var(--color-gold)] rounded-full" />
            {item}
          </a>
        ))}
      </nav>
    </aside>
  )
}

/* ─── Calculator ─── */
function Calculator() {
  const [value, setValue] = useState(1000)
  const bank = Math.round(value * 0.03)
  const uppora = Math.round(value * 0.015)
  const author = value - bank - uppora
  const fmt = (n) => n.toLocaleString('ru-RU')

  return (
    <div className="space-y-5">
      <div className="flex items-baseline justify-between">
        <Label>Сумма доната</Label>
        <div className="font-serif text-4xl text-[var(--color-gold)] font-semibold">{fmt(value)} ₽</div>
      </div>
      <input type="range" min="100" max="10000" step="100" value={value} onChange={e => setValue(+e.target.value)}
        className="w-full h-1 rounded-full appearance-none bg-black/10 accent-[var(--color-gold)] cursor-pointer [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-gold)] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-md" />
      <div className="space-y-3 font-typewriter text-sm">
        <div className="flex justify-between border-b border-black/10 pb-2">
          <span className="opacity-60">Автору</span>
          <span className="font-bold text-[var(--color-gold)] text-lg font-serif">{fmt(author)} ₽</span>
        </div>
        <div className="flex justify-between border-b border-black/10 pb-2">
          <span className="opacity-60">Банку (процессинг)</span>
          <span>{fmt(bank)} ₽</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-60">Uppora</span>
          <span>{fmt(uppora)} ₽</span>
        </div>
      </div>
      <div className="h-2 rounded-full bg-black/10 overflow-hidden">
        <div className="h-full rounded-full bg-[var(--color-gold)] transition-all" style={{ width: `${(author / value * 100)}%` }} />
      </div>
      <p className="font-typewriter text-[10px] text-center opacity-50">Альфа: комиссия 4,5% (3% эквайринг + 1,5% вывод). У конкурентов: 10–15%.</p>
    </div>
  )
}

/* ─── Hero Card Stack ─── */
function HeroCards() {
  return (
    <div id="section-0">
      {/* Desktop: 3 cards side by side with overlap via negative margins */}
      <div className="hidden lg:flex items-start justify-center -space-x-16 mb-16">
        {/* Card 1: Main key card — front (leftmost, highest z) */}
        <PaperCard bg="var(--color-emerald)" rotate="0deg"
          className="w-[380px] shrink-0 z-30 shadow-2xl mt-8 transition-all hover:-translate-y-1">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-14 bg-[var(--color-paper)] rounded-b-full shadow-inner z-40" />
          <div className="p-8 flex flex-col relative text-[var(--color-paper)]">
            <div className="flex flex-col mt-6">
              <span className="font-serif text-5xl leading-none tracking-tight text-[var(--color-gold)]">Комиссия</span>
              <span className="font-serif text-5xl leading-none italic text-[var(--color-gold)] pl-4">всего 4,5%</span>
            </div>
            <div className="mt-6"><Calculator /></div>
            <div className="flex justify-between items-end mt-6">
              <div className="relative w-24 h-20 flex items-center justify-center -rotate-6">
                <svg className="absolute w-full h-full text-[var(--color-gold)]" viewBox="0 0 100 100" fill="none">
                  <path d="M50 5 L95 90 L5 90 Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 1" strokeLinejoin="round" />
                </svg>
                <div className="relative z-10 text-center pt-3">
                  <span className="block font-sans-modern text-[8px] uppercase tracking-wider mb-0.5">Alpha</span>
                  <span className="block font-typewriter text-xl font-bold text-[var(--color-gold)]">2026</span>
                </div>
              </div>
              <a href="#section-4" className="group w-12 h-12 rounded-full bg-[var(--color-gold)] text-[var(--color-emerald)] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
            </div>
          </div>
        </PaperCard>

        {/* Card 2: How it works — middle */}
        <PaperCard bg="var(--color-navy)" rotate="-2deg"
          className="w-[340px] shrink-0 z-20 text-[var(--color-paper)] transition-transform duration-500 hover:rotate-[-1deg]">
          <div className="p-7 flex flex-col relative overflow-hidden min-h-[480px]">
            <div className="absolute -left-10 top-16 w-36 h-36 rounded-full border border-[var(--color-gold)]/25 spin-slow flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <path id="cp" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
                <text className="fill-[var(--color-gold)] text-[5.5px] font-typewriter uppercase tracking-[0.25em]">
                  <textPath href="#cp">QR-донаты • Без регистрации • Комиссия 4,5% • </textPath>
                </text>
              </svg>
            </div>
            <div className="mt-auto z-10 space-y-5">
              <h3 className="font-serif text-2xl italic text-[var(--color-gold)]">Три простых шага</h3>
              {[
                { n: '1', title: 'Мы создаём страницу', desc: 'Только имя и карта. Без паспорта. 2 минуты.' },
                { n: '2', title: 'Делитесь ссылкой или QR', desc: 'В био, на столе в кофейне, на витрине.' },
                { n: '3', title: 'Деньги на карте', desc: 'QR → сумма → готово. Вывод в тот же день.' },
              ].map(s => (
                <div key={s.n} className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full border border-[var(--color-gold)]/50 flex items-center justify-center shrink-0">
                    <span className="font-typewriter text-[10px] text-[var(--color-gold)]">{s.n}</span>
                  </div>
                  <div>
                    <div className="font-serif text-base">{s.title}</div>
                    <div className="font-typewriter text-[10px] opacity-70 leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute right-2 top-0 bottom-0 flex items-center">
              <span className="text-vertical font-typewriter text-[7px] tracking-[0.2em] uppercase opacity-40">Платёжный партнёр — Т-Банк</span>
            </div>
          </div>
        </PaperCard>

        {/* Card 3: Receipt / Finances — back */}
        <PaperCard bg="var(--color-warm-gray)" rotate="3deg"
          className="w-[320px] shrink-0 z-10 mt-4 transition-transform duration-500 hover:rotate-[2deg]">
          <div className="absolute left-3 top-0 bottom-0 flex items-center border-r border-black/10 pr-2">
            <span className="text-vertical font-typewriter text-[8px] tracking-widest uppercase opacity-50">uppora.org • альфа • 2026</span>
          </div>
          <div className="pl-10 pt-8 pr-6 pb-5 flex flex-col">
            <div className="absolute top-5 right-5 w-16 h-16 border border-black/15 rounded-full flex items-center justify-center -rotate-12">
              <div className="w-12 h-12 border border-dashed border-black/20 rounded-full flex items-center justify-center">
                <span className="font-typewriter text-[7px] text-center leading-tight opacity-60">ОТКРЫТАЯ<br />БУХГАЛ-<br />ТЕРИЯ</span>
              </div>
            </div>
            <div className="mt-24 space-y-3">
              <div className="border-b border-black/10 pb-2">
                <Label>Каждый донат в 1 000 ₽</Label>
                <div className="font-typewriter text-sm mt-2 space-y-1">
                  <div className="flex justify-between"><span className="opacity-60">Автору</span><span className="text-[var(--color-emerald)] font-bold text-lg font-serif">955 ₽</span></div>
                  <div className="flex justify-between"><span className="opacity-60">Банку</span><span>30 ₽</span></div>
                  <div className="flex justify-between"><span className="opacity-60">Uppora</span><span>15 ₽</span></div>
                </div>
              </div>
              <p className="font-serif text-sm italic leading-relaxed opacity-80">
                «Мы зарабатываем <strong className="text-[var(--color-emerald)] not-italic">15 ₽</strong> с каждой тысячи. 15 рублей — наш единственный доход.»
              </p>
            </div>
            <div className="mt-3 border-t-2 border-dashed border-black/10 pt-2">
              <span className="font-typewriter text-[7px] uppercase tracking-wider">Открытая бухгалтерия</span>
            </div>
          </div>
        </PaperCard>
      </div>

      {/* Mobile: stacked vertically */}
      <div className="flex flex-col gap-6 lg:hidden mb-12">
        <PaperCard bg="var(--color-emerald)" className="p-6 text-[var(--color-paper)]">
          <div className="relative z-10">
            <div className="flex flex-col mb-4">
              <span className="font-serif text-4xl leading-none tracking-tight text-[var(--color-gold)]">Комиссия</span>
              <span className="font-serif text-4xl leading-none italic text-[var(--color-gold)] pl-3">всего 4,5%</span>
            </div>
            <Calculator />
          </div>
        </PaperCard>
        <PaperCard bg="var(--color-navy)" className="p-6 text-[var(--color-paper)]">
          <div className="relative z-10 space-y-4">
            <h3 className="font-serif text-2xl italic text-[var(--color-gold)]">Три простых шага</h3>
            {[
              { n: '1', title: 'Мы создаём страницу', desc: 'Только имя и карта. Без паспорта. 2 минуты.' },
              { n: '2', title: 'Делитесь ссылкой или QR', desc: 'В био, на столе в кофейне, на витрине.' },
              { n: '3', title: 'Деньги на карте', desc: 'QR → сумма → готово. Вывод в тот же день.' },
            ].map(s => (
              <div key={s.n} className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full border border-[var(--color-gold)]/50 flex items-center justify-center shrink-0">
                  <span className="font-typewriter text-[10px] text-[var(--color-gold)]">{s.n}</span>
                </div>
                <div>
                  <div className="font-serif text-base">{s.title}</div>
                  <div className="font-typewriter text-[10px] opacity-70">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </PaperCard>
        <PaperCard bg="var(--color-warm-gray)" className="p-6">
          <div className="relative z-10 space-y-3">
            <Label>Открытая бухгалтерия — каждый донат в 1 000 ₽</Label>
            <div className="font-typewriter text-sm space-y-1">
              <div className="flex justify-between"><span className="opacity-60">Автору</span><span className="text-[var(--color-emerald)] font-bold text-lg font-serif">955 ₽</span></div>
              <div className="flex justify-between"><span className="opacity-60">Банку</span><span>30 ₽</span></div>
              <div className="flex justify-between"><span className="opacity-60">Uppora</span><span>15 ₽</span></div>
            </div>
            <p className="font-serif text-sm italic opacity-80">«15 рублей — наш единственный доход.»</p>
          </div>
        </PaperCard>
      </div>
    </div>
  )
}

/* ─── Pain Points ─── */
function PainPoints() {
  const pains = [
    { icon: '💸', title: '10–15% комиссии', desc: 'Типичная платформа забирает 10% комиссии + 3% эквайринг. С каждой тысячи автору — 870 ₽.', answer: 'Uppora: 4,5% всего. Автору — 955 ₽' },
    { icon: '🔐', title: 'Регистрация для донатера', desc: 'Хочешь поддержать автора — создай аккаунт, подтверди email, запомни пароль. Половина уходит.', answer: 'Uppora: ноль регистрации. QR → сумма → готово' },
    { icon: '🔄', title: 'Подписки = обязательства', desc: 'Подписная модель создаёт давление: автор обязан выдавать контент, фан — продлевать подписку.', answer: 'Uppora: разовые донаты. Благодарность, не обязательство' },
    { icon: '⏳', title: 'Выплаты через неделю', desc: 'Деньги «на платформе» — вывод раз в неделю, у некоторых — раз в месяц или через 90 дней.', answer: 'Uppora: выплата на карту в тот же день' },
  ]
  return (
    <section className="py-16">
      <SectionTag>Что не так с другими платформами</SectionTag>
      <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-emerald)] mb-2">
        Барьеры, которых<br /><span className="line-through decoration-red-500 decoration-2 opacity-50">не должно быть</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
        {pains.map(p => (
          <PaperCard key={p.title} bg="var(--color-warm-gray)" className="p-6 hover:-translate-y-1 transition-transform">
            <div className="relative z-10">
              <div className="text-2xl mb-3">{p.icon}</div>
              <h3 className="font-serif text-xl mb-2">{p.title}</h3>
              <p className="font-typewriter text-[11px] leading-relaxed opacity-70">{p.desc}</p>
              <div className="mt-3 pt-3 border-t border-black/10 font-typewriter text-[11px] text-[var(--color-emerald)] font-bold flex items-center gap-1.5">
                <span>✓</span> {p.answer}
              </div>
            </div>
          </PaperCard>
        ))}
      </div>
    </section>
  )
}

/* ─── Use Cases ─── */
function UseCases() {
  const cases = [
    { n: '01', title: 'Маркетплейс с QR-кодом', desc: 'Продаёте хендмейд на маркетплейсе? Положите QR-карточку в каждую посылку. Благодарный покупатель сканирует — вы получаете донат напрямую.' },
    { n: '02', title: 'Ссылка в Telegram-канале', desc: 'Один линк в описании канала или в закреплённом сообщении. Подписчики могут поддержать автора в один клик, без регистрации на сторонних платформах.' },
    { n: '03', title: 'Концерт или мероприятие', desc: 'QR-постер на мерч-стойке или у входа. Зрители сканируют прямо с телефона — донат уходит музыканту или организатору в тот же день.' },
    { n: '04', title: 'Блог или подкаст', desc: 'Ссылка в описании эпизода или в био. Разовый донат вместо подписки — проще для аудитории, честнее для автора.' },
    { n: '05', title: 'Кафе или коворкинг', desc: 'QR-стикер на кассе. «Понравилось? Поддержите нас». Работает как цифровая банка для чаевых — без наличных, без комиссий агрегаторов.' },
  ]
  return (
    <section className="py-16">
      <SectionTag>Кому подходит</SectionTag>
      <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-navy)] mb-10">5 сценариев использования</h2>
      <div className="space-y-4">
        {cases.map(c => (
          <div key={c.n} className="flex gap-5 items-start p-5 rounded-lg border border-[var(--color-gold)]/20 hover:border-[var(--color-gold)]/50 transition-colors bg-[var(--color-paper)]">
            <div className="w-10 h-10 rounded-full border border-[var(--color-gold)] flex items-center justify-center shrink-0">
              <span className="font-typewriter text-[11px] text-[var(--color-gold)]">{c.n}</span>
            </div>
            <div>
              <h3 className="font-serif text-xl text-[var(--color-emerald)]">{c.title}</h3>
              <p className="font-typewriter text-[11px] leading-relaxed opacity-70 mt-1">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Comparison Table ─── */
function Comparison() {
  const rows = [
    { feature: 'Итого комиссия', uppora: '4,5%', boosty: '~11,7%', da: '~12%', vk: '~10%', donatepay: '~7–10%', donatty: '~8–12%' },
    { feature: 'Регистрация донатера', uppora: '✓ Не нужна', boosty: '✗ Нужна', da: '✗ Нужна', vk: '✗ Нужна VK', donatepay: '✗ Нужна', donatty: '✗ Нужна' },
    { feature: 'Скорость выплат', uppora: 'В тот же день', boosty: '1–5 дней', da: 'До 90 дней', vk: '2–5 дней', donatepay: '1–3 дня', donatty: '1–7 дней' },
    { feature: 'Офлайн (QR-кит)', uppora: '✓ Есть', boosty: '✗', da: '✗', vk: '✗', donatepay: '✗', donatty: '✗' },
    { feature: 'НДФЛ для автора', uppora: '0% (дарение)', boosty: '13%+', da: '13%+', vk: '13%+', donatepay: '13%+', donatty: '13%+' },
    { feature: 'Модель', uppora: 'Разовые донаты', boosty: 'Подписки', da: 'Стрим-донаты', vk: 'Подписки', donatepay: 'Стрим-донаты', donatty: 'Донаты' },
    { feature: 'Онбординг', uppora: 'Консьерж', boosty: 'Self-serve', da: 'Self-serve', vk: 'Self-serve', donatepay: 'Self-serve', donatty: 'Self-serve' },
  ]
  return (
    <section className="py-16" id="section-1">
      <SectionTag>Сравнение</SectionTag>
      <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-emerald)] mb-2">Uppora vs. конкуренты</h2>
      <p className="font-typewriter text-[11px] opacity-50 mb-8">На основе публичных тарифов, март 2026</p>
      <div className="overflow-x-auto rounded-lg border border-[var(--color-gold)]/30">
        <table className="w-full min-w-[700px] font-typewriter text-[11px]">
          <thead>
            <tr className="bg-[var(--color-emerald)] text-[var(--color-paper)]">
              <th className="text-left p-3 font-normal">Характеристика</th>
              <th className="text-left p-3 font-bold text-[var(--color-gold)]">Uppora</th>
              <th className="text-left p-3 font-normal">Boosty</th>
              <th className="text-left p-3 font-normal">DA</th>
              <th className="text-left p-3 font-normal">VK Donut</th>
              <th className="text-left p-3 font-normal">DonatePay</th>
              <th className="text-left p-3 font-normal">Donatty</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.feature} className={`border-t border-[var(--color-gold)]/10 ${i % 2 === 0 ? 'bg-[var(--color-paper)]' : 'bg-[var(--color-warm-gray)]/30'} hover:bg-[var(--color-gold)]/5 transition-colors`}>
                <td className="p-3 font-bold">{r.feature}</td>
                <td className="p-3 text-[var(--color-emerald)] font-bold">{r.uppora}</td>
                <td className="p-3 opacity-70">{r.boosty}</td>
                <td className="p-3 opacity-70">{r.da}</td>
                <td className="p-3 opacity-70">{r.vk}</td>
                <td className="p-3 opacity-70">{r.donatepay}</td>
                <td className="p-3 opacity-70">{r.donatty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-typewriter text-[9px] opacity-40 mt-3 text-center">Данные из публичных тарифов платформ. Комиссии включают все сборы.</p>
    </section>
  )
}

/* ─── Legal Model ─── */
function LegalModel() {
  return (
    <section className="py-16" id="section-2">
      <SectionTag>Юридическая модель</SectionTag>
      <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-emerald)] mb-10">
        Две модели. Мы выбрали ту,<br />что выгоднее автору.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PaperCard bg="var(--color-warm-gray)" className="p-6 opacity-60">
          <div className="relative z-10">
            <span className="inline-block font-typewriter text-[10px] uppercase tracking-widest bg-red-100 text-red-700 px-3 py-1 rounded-full mb-4">Стандартный путь</span>
            <h3 className="font-serif text-2xl mb-4">Оплата услуг</h3>
            {['Донат отправляется', 'Попадает на счёт платформы (ООО)', 'Комиссия платформы 10–15%', 'Удержание НДФЛ 13%', 'Запрос на вывод средств', 'Остаток доходит автору'].map((s, i) => (
              <div key={i} className="flex gap-2 items-start py-2 font-typewriter text-[11px]">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-[10px] shrink-0">{i + 1}</span>
                <span className="opacity-70">{s}</span>
              </div>
            ))}
            <div className="mt-4 pt-3 border-t border-black/10 font-serif text-lg text-red-600 font-bold">
              Потери: до 25–30% с каждого доната
            </div>
          </div>
        </PaperCard>

        <PaperCard bg="var(--color-emerald)" className="p-6 text-[var(--color-paper)] border-[var(--color-gold)]/40 border-2">
          <div className="relative z-10">
            <span className="inline-block font-typewriter text-[10px] uppercase tracking-widest bg-[var(--color-gold)]/20 text-[var(--color-gold)] px-3 py-1 rounded-full mb-4">Путь Uppora</span>
            <h3 className="font-serif text-2xl mb-4">Договор дарения</h3>
            {['Донатер отправляет деньги', 'Деньги сразу на карте автора'].map((s, i) => (
              <div key={i} className="flex gap-2 items-start py-2 font-typewriter text-[11px]">
                <span className="w-5 h-5 rounded-full bg-[var(--color-gold)]/20 text-[var(--color-gold)] flex items-center justify-center text-[10px] shrink-0">{i + 1}</span>
                <span className="opacity-80">{s}</span>
              </div>
            ))}
            <div className="mt-6 pt-3 border-t border-[var(--color-gold)]/30 font-serif text-lg text-[var(--color-gold)]">
              Основание: ст. 217 НК РФ<br />
              НДФЛ: 0%<br />
              Статус ИП/самозанятого: не нужен
            </div>
          </div>
        </PaperCard>
      </div>
      <p className="font-typewriter text-[10px] opacity-40 mt-4 text-center">Дарение между физическими лицами не облагается НДФЛ по ст. 217 НК РФ, п. 18.1</p>
    </section>
  )
}

/* ─── Founder ─── */
function Founder() {
  return (
    <section className="py-16">
      <PaperCard bg="var(--color-navy)" className="p-8 lg:p-10 text-[var(--color-paper)]">
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-24 h-24 rounded-full bg-[var(--color-gold)]/20 border-2 border-[var(--color-gold)] flex items-center justify-center shrink-0">
            <span className="font-serif text-3xl italic text-[var(--color-gold)]">ИП</span>
          </div>
          <div>
            <Label className="text-[var(--color-gold)]">Основатель</Label>
            <blockquote className="font-serif text-xl italic leading-relaxed mt-2 opacity-90">
              «Я видел, как авторы теряют 20–30% заработанного на комиссиях и налогах. Мы нашли способ делать это иначе — через договор дарения, где комиссия всего 4,5%.»
            </blockquote>
            <div className="mt-4">
              <span className="font-serif text-lg font-bold">Илья Панов</span>
              <span className="font-typewriter text-[11px] opacity-60 ml-3">Основатель Uppora</span>
            </div>
          </div>
        </div>
      </PaperCard>
    </section>
  )
}

/* ─── FAQ ─── */
function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)
  const faqs = [
    { q: 'Есть ли отзывы?', a: 'Мы сейчас на стадии альфы, поэтому пока собираем первую волну авторов. Отзывов в классическом формате ещё немного, потому что платформа только запускается. Зато сейчас можно подключиться в числе первых и спокойно протестировать сервис на старте.' },
    { q: 'Почему подключаете к платформе сами?', a: 'Чтобы вам не пришлось разбираться в регистрации и настройках. Мы берём создание страницы на себя, всё настраиваем за пару минут.' },
    { q: 'Почему такая низкая комиссия?', a: 'Мы изначально хотели сделать сервис, который будет удобен и доступен авторам из разных ниш. Поэтому сделали комиссию максимально комфортной, чтобы донаты действительно оставались рабочим инструментом монетизации, а не съедались сервисом.' },
    { q: 'Могу зарегистрироваться и начать позднее?', a: 'Да, конечно. Вы можете зарегистрироваться сейчас, а начать пользоваться тогда, когда вам будет удобно. Страница никуда не исчезнет и не «сгорит».' },
    { q: 'У меня уже есть Boosty / VK Донаты — нужно ли отключаться?', a: 'Нет, не нужно. Uppora работает параллельно с другими сервисами донатов, так что ничего отключать не придётся.' },
    { q: 'Зачем мне дополнительный сервис для донатов?', a: 'Потому что далеко не все готовы оформлять ежемесячную подписку. Часто человек хочет просто поддержать автора один раз, здесь и сейчас. Для этого и создана Uppora.' },
    { q: 'Можно ли вывести на зарубежную карту?', a: 'Пока нет, сейчас вывод доступен только на карту РФ. Но в будущем мы планируем добавить и другие варианты вывода.' },
    { q: 'Сколько времени занимает подключение?', a: 'Обычно всего несколько минут. Мы сами помогаем с настройкой, поэтому с вашей стороны всё максимально просто.' },
    { q: 'Нужно ли что-то регулярно обновлять или вести?', a: 'Нет, ничего сложного не требуется. После подключения страница уже готова к использованию.' },
    { q: 'Это замена другим способам монетизации?', a: 'Нет, скорее дополнение. Uppora подходит для разовой поддержки от аудитории и может работать вместе с подписками и другими сервисами.' },
    { q: 'На чём зарабатывает Uppora?', a: 'С каждой тысячи рублей донатов мы получаем 15 ₽ (1,5%). Ещё 30 ₽ (3%) забирает банк за процессинг. Итого комиссия 4,5%. Никаких подписок, скрытых сборов и комиссий за контент.' },
    { q: 'А что с налогами?', a: 'Донаты оформляются как договор дарения между физическими лицами. По ст. 217 НК РФ такие подарки не облагаются НДФЛ. Статус ИП или самозанятого не требуется.' },
  ]
  return (
    <section className="py-16" id="section-3">
      <SectionTag>FAQ</SectionTag>
      <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-emerald)] mb-8">Частые вопросы</h2>
      <div className="max-w-2xl">
        {faqs.map((f, i) => (
          <div key={i} className="border-b border-[var(--color-gold)]/20">
            <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex justify-between items-center py-4 text-left cursor-pointer group">
              <span className="font-serif text-lg group-hover:text-[var(--color-emerald)] transition-colors">{f.q}</span>
              <span className={`font-typewriter text-[var(--color-gold)] transition-transform ${openIdx === i ? 'rotate-180' : ''}`}>▾</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-60 pb-4' : 'max-h-0'}`}>
              <p className="font-typewriter text-[12px] leading-relaxed opacity-70">{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Final CTA ─── */
function FinalCTA() {
  return (
    <section className="py-16" id="section-4">
      <PaperCard bg="var(--color-emerald)" className="p-8 lg:p-12 text-[var(--color-paper)] text-center">
        <div className="relative z-10 max-w-lg mx-auto">
          <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-gold)] mb-4">
            Бесплатно. Без паспорта.<br />Без подписки.
          </h2>
          <p className="font-typewriter text-[12px] opacity-80 mb-8">
            Оставьте заявку — мы настроим страницу и QR за вас.<br />Ответим в течение 2 часов.
          </p>
          <form className="flex flex-col gap-3 text-left max-w-sm mx-auto" onSubmit={e => e.preventDefault()}>
            <input placeholder="Ваше имя" className="p-3 rounded-lg bg-white/10 border border-[var(--color-gold)]/30 text-[var(--color-paper)] placeholder:opacity-50 font-typewriter text-sm focus:outline-none focus:border-[var(--color-gold)]" />
            <input type="email" placeholder="Email" className="p-3 rounded-lg bg-white/10 border border-[var(--color-gold)]/30 text-[var(--color-paper)] placeholder:opacity-50 font-typewriter text-sm focus:outline-none focus:border-[var(--color-gold)]" />
            <select className="p-3 rounded-lg bg-white/10 border border-[var(--color-gold)]/30 text-[var(--color-paper)]/50 font-typewriter text-sm focus:outline-none focus:border-[var(--color-gold)]">
              <option value="">Ваша ниша</option>
              <option>Музыка</option>
              <option>Образование / лекции</option>
              <option>Искусство / хендмейд</option>
              <option>Стримы / видео</option>
              <option>НКО / благотворительность</option>
              <option>Кафе / общепит</option>
              <option>Подкасты</option>
              <option>Другое</option>
            </select>
            <label className="flex items-start gap-2 font-typewriter text-[10px] opacity-60">
              <input type="checkbox" className="mt-0.5 accent-[var(--color-gold)]" />
              Согласен на обработку персональных данных в соответствии с 152-ФЗ
            </label>
            <button type="submit" className="mt-2 w-full py-3 rounded-lg bg-[var(--color-gold)] text-[var(--color-emerald)] font-typewriter uppercase text-sm tracking-widest font-bold hover:brightness-110 transition cursor-pointer">
              Оставить заявку →
            </button>
          </form>
          <a href="https://t.me/uppora_support" target="_blank" rel="noopener"
            className="inline-block mt-4 font-typewriter text-[11px] uppercase tracking-widest text-[var(--color-gold)] opacity-70 hover:opacity-100 transition border-b border-[var(--color-gold)]/30">
            Или напишите в Telegram
          </a>
          <div className="flex flex-wrap justify-center gap-6 mt-8 font-typewriter text-[10px] opacity-50">
            <span>SSL + PCI DSS</span>
            <span>Ст. 217 НК РФ — 0% НДФЛ</span>
            <span>Т-Банк — платёжный партнёр</span>
          </div>
        </div>
      </PaperCard>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="py-12 border-t border-[var(--color-gold)]/20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="font-serif text-3xl text-[var(--color-emerald)]">Up<span className="italic">pora</span></div>
          <p className="font-typewriter text-[11px] opacity-50 mt-2">Платформа QR-донатов для авторов.<br />Поддерживать людей людям.</p>
        </div>
        <div>
          <h4 className="font-typewriter text-[10px] uppercase tracking-widest opacity-50 mb-3">Продукт</h4>
          <div className="space-y-1">
            {['Как это работает', 'Кому подходит', 'Сравнение', 'FAQ'].map(l => (
              <a key={l} href="#" className="block font-typewriter text-[11px] opacity-60 hover:text-[var(--color-emerald)] hover:opacity-100 transition">{l}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-typewriter text-[10px] uppercase tracking-widest opacity-50 mb-3">Контакты</h4>
          <a href="https://t.me/uppora_support" className="block font-typewriter text-[11px] opacity-60 hover:text-[var(--color-emerald)] hover:opacity-100 transition">Telegram</a>
          <a href="mailto:hello@uppora.org" className="block font-typewriter text-[11px] opacity-60 hover:text-[var(--color-emerald)] hover:opacity-100 transition">hello@uppora.org</a>
        </div>
      </div>
      <div className="mt-8 pt-4 border-t border-[var(--color-gold)]/10 text-center font-typewriter text-[10px] opacity-40">
        © 2026 Uppora. Платёжный партнёр — Т-Банк.
      </div>
    </footer>
  )
}

/* ─── App ─── */
export default function App() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <NoiseOverlay />
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-6 lg:px-12 xl:px-16 py-8 lg:py-12">
        <HeroCards />
        <GoldDivider />
        {/* Trust row under hero */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: 'i', color: 'var(--color-emerald)', title: 'Платёжный партнёр', desc: 'Т-Банк. SSL + PCI DSS.\nНадёжный эквайринг.' },
            { icon: '→', color: 'var(--color-navy)', title: '0% НДФЛ', desc: 'Договор дарения.\nСт. 217 НК РФ.' },
            { icon: '◆', color: 'var(--color-gold)', title: 'Ответ за 2 часа', desc: 'Консьерж-онбординг.\nМы настроим всё сами.' },
          ].map(t => (
            <div key={t.title} className="flex flex-col items-center lg:items-start gap-2 text-center lg:text-left">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-serif italic text-sm" style={{ background: t.color }}>
                {t.icon}
              </div>
              <h3 className="font-serif text-lg" style={{ color: t.color }}>{t.title}</h3>
              <p className="font-typewriter text-[11px] leading-relaxed opacity-60 whitespace-pre-line">{t.desc}</p>
            </div>
          ))}
        </div>
        <GoldDivider />
        <PainPoints />
        <GoldDivider />
        <UseCases />
        <GoldDivider />
        <Comparison />
        <GoldDivider />
        <LegalModel />
        <GoldDivider />
        <Founder />
        <GoldDivider />
        <FAQ />
        <GoldDivider />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  )
}
