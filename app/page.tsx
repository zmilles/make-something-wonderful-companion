'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CirclePlay,
  FileText,
  Headphones,
  Search,
  Video,
} from 'lucide-react';

type Availability = 'full-video' | 'partial-video' | 'full-audio' | 'not-found';
type ViewMode = 'compare' | 'book' | 'source';

type Entry = {
  id: string;
  part: string;
  year: string;
  title: string;
  bookSection: string;
  quote: string;
  event: string;
  date: string;
  venue: string;
  availability: Availability;
  relationship: string;
  note: string;
  sourceName: string;
  sourceUrl?: string;
  youtubeId?: string;
  timestamp?: number;
  timestampLabel?: string;
  duration?: string;
};

const entries: Entry[] = [
  {
    id: 'ways-to-be', part: 'Opening', year: '2007', title: 'There’s lots of ways to be',
    bookSection: 'Opening epigraph', quote: 'There’s lots of ways to be, as a person.',
    event: 'Apple employee communications meeting', date: 'October 23, 2007', venue: 'Apple',
    availability: 'partial-video', relationship: 'Published excerpt',
    note: 'The Archive released the passage used in the book, not the full internal meeting.',
    sourceName: 'Steve Jobs Archive', sourceUrl: 'https://stevejobsarchive.com/stories/on-the-origin-of-make-something-wonderful',
  },
  {
    id: 'aspen-1983', part: 'Part I', year: '1983', title: 'Computers and society',
    bookSection: 'Speech at the International Design Conference in Aspen', quote: 'Computers and society are out on a first date.',
    event: 'International Design Conference in Aspen', date: 'June 15, 1983', venue: 'Aspen, Colorado',
    availability: 'full-video', relationship: 'Edited excerpt',
    note: 'A complete recording survives; the book selects passages from the 55-minute talk.',
    sourceName: 'Steve Jobs Archive on YouTube', sourceUrl: 'https://www.youtube.com/watch?v=t9HmOz8H0qI', youtubeId: 't9HmOz8H0qI', duration: '54:42',
  },
  {
    id: 'orwell-1983', part: 'Part I', year: '1983', title: 'Was George Orwell right?',
    bookSection: 'Speech to Apple Employees', quote: 'Was George Orwell right about 1984?',
    event: 'Apple sales conference', date: 'October 1983', venue: 'Hawaii',
    availability: 'partial-video', relationship: 'Surviving excerpt',
    note: 'The surviving compilation includes the book’s introduction to the “1984” commercial, not the whole meeting.',
    sourceName: 'Surviving conference excerpts', sourceUrl: 'https://www.youtube.com/watch?v=Xl0vhiLUIxk', youtubeId: 'Xl0vhiLUIxk',
  },
  {
    id: 'reed-1991', part: 'Part II', year: '1991', title: 'Character is built in bad times',
    bookSection: 'Speech at Reed College', quote: 'Character is built not in good times, but in bad times.',
    event: 'Reed College convocation', date: 'August 27, 1991', venue: 'Portland, Oregon',
    availability: 'full-audio', relationship: 'Edited excerpt',
    note: 'The complete audio is public. Jobs begins after the introduction and award presentation.',
    sourceName: 'Official Reed College audio', sourceUrl: 'https://soundcloud.com/reedcollege/steve-jobs-reed-college-1991-convocation', timestamp: 507, timestampLabel: '08:27', duration: '52 min',
  },
  {
    id: 'palo-alto-1996', part: 'Part II', year: '1996', title: 'What you follow with your heart',
    bookSection: 'Speech at Palo Alto High School', quote: 'What you follow with your heart…',
    event: 'Palo Alto High School graduation', date: 'June 1996', venue: 'Palo Alto, California',
    availability: 'not-found', relationship: 'Source artifact only',
    note: 'The Archive publishes Jobs’s speech copy and related artifacts. No public audio or video was located.',
    sourceName: 'Steve Jobs Archive artifact', sourceUrl: 'https://stevejobsarchive.com/artifact/palo-alto-high-school-speech',
  },
  {
    id: 'part-three-opening', part: 'Part III', year: '2005', title: 'Much of what I stumbled into',
    bookSection: 'Opening of Part III, 1996–2011', quote: 'Much of what I stumbled into…',
    event: 'Stanford commencement address', date: 'June 12, 2005', venue: 'Stanford, California',
    availability: 'full-video', relationship: 'Reused passage',
    note: 'The opening of Part III is reused from the later commencement address.',
    sourceName: 'Official Stanford video', sourceUrl: 'https://www.youtube.com/watch?v=UF8uR6Z6KLc', youtubeId: 'UF8uR6Z6KLc', duration: '15:05',
  },
  {
    id: 'returning-to-apple', part: 'Part III', year: '2003', title: 'Returning to Apple',
    bookSection: 'Steve on Returning to Apple / Speech at Stanford GSB', quote: 'You never know what’s around the next corner.',
    event: 'Stanford Graduate School of Business talk', date: 'May 29, 2003', venue: 'Stanford, California',
    availability: 'not-found', relationship: 'Two sections, one event',
    note: 'Two book sections come from this talk. A contemporary report survives, but no public recording was located.',
    sourceName: 'Stanford GSB event report', sourceUrl: 'https://www.gsb.stanford.edu/insights/steve-jobs-singing-new-tune',
  },
  {
    id: 'think-different', part: 'Part III', year: '1997', title: 'People with passion',
    bookSection: 'Speech to Apple Employees', quote: 'People with passion can change the world for the better.',
    event: 'Internal “Think Different” presentation', date: 'September 23, 1997', venue: 'Apple',
    availability: 'full-video', relationship: 'Edited excerpt',
    note: 'The book is an edited excerpt from the complete internal tape.',
    sourceName: 'Full video with transcript', sourceUrl: 'https://allaboutstevejobs.com/videos/misc/think_different_1997_internal',
  },
  {
    id: 'macworld-1998', part: 'Part III', year: '1998', title: 'Apple is coming back',
    bookSection: 'Speech at Macworld', quote: 'Apple is coming back in a very big way.',
    event: 'Macworld New York keynote', date: 'July 7, 1998', venue: 'New York, New York',
    availability: 'full-video', relationship: 'Heavily edited excerpt',
    note: 'The book cuts among multiple portions of the complete keynote.',
    sourceName: 'Full Macworld keynote', sourceUrl: 'https://allaboutstevejobs.com/videos/keynotes/macworld_ny_1998',
  },
  {
    id: 'pixar-emeryville', part: 'Part III', year: '2000', title: 'A bit of Pixar’s soul',
    bookSection: 'Speech to Pixar Employees', quote: 'Hopefully we captured a bit of Pixar’s soul.',
    event: 'Opening of Pixar’s Emeryville headquarters', date: 'November 2000', venue: 'Emeryville, California',
    availability: 'not-found', relationship: 'Recording unavailable',
    note: 'No reliable public recording of this internal speech was located.',
    sourceName: 'No public source located',
  },
  {
    id: 'first-apple-store', part: 'Part III', year: '2001', title: 'The first Apple Store',
    bookSection: 'Speech Introducing the First Apple Store', quote: 'Wouldn’t it be great if…',
    event: 'Recorded tour of the Tysons Corner store', date: 'May 2001', venue: 'McLean, Virginia',
    availability: 'full-video', relationship: 'Close match',
    note: 'This was made as a video for developers, making it a particularly close match to the text.',
    sourceName: 'Original store tour', sourceUrl: 'https://www.youtube.com/watch?v=OJtQeMHGrgc', youtubeId: 'OJtQeMHGrgc',
  },
  {
    id: 'stanford-2005', part: 'Part III', year: '2005', title: 'Stay hungry. Stay foolish.',
    bookSection: 'Commencement Address at Stanford University', quote: 'You’ve got to find what you love.',
    event: 'Stanford commencement address', date: 'June 12, 2005', venue: 'Stanford, California',
    availability: 'full-video', relationship: 'Near-verbatim',
    note: 'Jobs read the prepared text almost word for word, making this the closest direct comparison in the book.',
    sourceName: 'Official Stanford video', sourceUrl: 'https://www.youtube.com/watch?v=UF8uR6Z6KLc&t=501s', youtubeId: 'UF8uR6Z6KLc', timestamp: 501, timestampLabel: '08:21', duration: '15:05',
  },
  {
    id: 'iphone-eve', part: 'Part III', year: '2007', title: 'We could make a contribution',
    bookSection: 'Speech to Apple Employees', quote: 'We thought we could make a contribution…',
    event: 'Internal iPhone-eve meeting', date: 'June 28, 2007', venue: 'Apple',
    availability: 'not-found', relationship: 'Recording unavailable',
    note: 'This internal meeting happened the day before the iPhone went on sale. It is not the January launch keynote.',
    sourceName: 'No public source located',
  },
  {
    id: 'iphone-launch', part: 'Part III', year: '2007', title: 'A revolutionary product',
    bookSection: 'Speech at Macworld', quote: 'Every once in a while, a revolutionary product comes along…',
    event: 'Original iPhone introduction', date: 'January 9, 2007', venue: 'San Francisco, California',
    availability: 'full-video', relationship: 'Edited excerpt',
    note: 'The book uses the famous opening section of the full keynote.',
    sourceName: 'Full Macworld keynote', sourceUrl: 'https://www.youtube.com/watch?v=2MlSJLPxGYs', youtubeId: '2MlSJLPxGYs', duration: '80 min',
  },
  {
    id: 'music-event-2009', part: 'Part III', year: '2009', title: 'Five months ago',
    bookSection: 'Speech to the Press', quote: 'Five months ago, I had a liver transplant.',
    event: '“It’s Only Rock ’N’ Roll” music event', date: 'September 9, 2009', venue: 'San Francisco, California',
    availability: 'full-video', relationship: 'Opening remarks',
    note: 'The book reproduces Jobs’s opening remarks; the recording continues into product announcements.',
    sourceName: 'Full Apple event', sourceUrl: 'https://allaboutstevejobs.com/videos/keynotes/its_only_rock_n_roll_2009',
  },
  {
    id: 'ipad-town-hall', part: 'Part III', year: '2010', title: 'Steve on the iPad',
    bookSection: 'Steve on the iPad', quote: 'Steve on the iPad',
    event: 'Internal Apple Town Hall', date: 'Early February 2010', venue: 'Apple',
    availability: 'not-found', relationship: 'Recording unavailable',
    note: 'The public iPad launch is a different event and does not match this text.',
    sourceName: 'No public source located',
  },
  {
    id: 'organ-donation', part: 'Part III', year: '2010', title: 'One simple question',
    bookSection: 'Speech at Lucile Packard Children’s Hospital', quote: 'One simple question.',
    event: 'Organ-donation event', date: 'March 19, 2010', venue: 'Stanford, California',
    availability: 'full-video', relationship: 'Edited excerpt',
    note: 'The full event is public. Arnold Schwarzenegger speaks first; Jobs begins at 12:45.',
    sourceName: 'Full organ-donation event', sourceUrl: 'https://allaboutstevejobs.com/videos/misc/organs_donation_2010', timestamp: 765, timestampLabel: '12:45',
  },
];

const availabilityLabel: Record<Availability, string> = {
  'full-video': 'Full video',
  'partial-video': 'Video excerpt',
  'full-audio': 'Full audio',
  'not-found': 'Text only',
};

const filters: Array<{ id: 'all' | Availability; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'full-video', label: 'Video' },
  { id: 'partial-video', label: 'Excerpts' },
  { id: 'full-audio', label: 'Audio' },
  { id: 'not-found', label: 'Text only' },
];

function AvailabilityIcon({ availability }: { availability: Availability }) {
  if (availability === 'full-audio') return <Headphones aria-hidden="true" />;
  if (availability === 'not-found') return <FileText aria-hidden="true" />;
  return <Video aria-hidden="true" />;
}

export default function Home() {
  const [selectedId, setSelectedId] = useState('stanford-2005');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | Availability>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('compare');
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const requested = window.location.hash.replace('#', '');
    if (entries.some((entry) => entry.id === requested)) setSelectedId(requested);
  }, []);

  useEffect(() => setPlaying(false), [selectedId]);

  const filteredEntries = useMemo(() => {
    const query = search.trim().toLowerCase();
    return entries.filter((entry) => {
      const matchesFilter = filter === 'all' || entry.availability === filter;
      const haystack = `${entry.title} ${entry.bookSection} ${entry.event} ${entry.year} ${entry.quote}`.toLowerCase();
      return matchesFilter && (!query || haystack.includes(query));
    });
  }, [filter, search]);

  const selected = entries.find((entry) => entry.id === selectedId) ?? entries[0];
  const selectedIndex = entries.findIndex((entry) => entry.id === selected.id);
  const previous = entries[(selectedIndex - 1 + entries.length) % entries.length];
  const next = entries[(selectedIndex + 1) % entries.length];
  const progress = selected.timestamp && selected.duration === '15:05' ? `${(selected.timestamp / 905) * 100}%` : '18%';

  function selectEntry(entry: Entry) {
    setSelectedId(entry.id);
    window.history.replaceState(null, '', `#${entry.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function stepTo(entry: Entry) {
    selectEntry(entry);
  }

  return (
    <main className={`site-frame mode-${viewMode}`}>
      <header className="masthead">
        <button className="wordmark" onClick={() => stepTo(entries[0])} aria-label="Make Something Wonderful home">
          <span className="wordmark-mark">MW</span>
          <span className="wordmark-copy">
            <strong>Make Something Wonderful</strong>
            <small>A recorded companion</small>
          </span>
        </button>
        <nav className="masthead-nav" aria-label="Primary navigation">
          <a href="#method">Method</a>
          <span className="source-count">{entries.length} passages</span>
        </nav>
      </header>

      <div className="archive-layout">
        <aside className="section-index" aria-label="Book sections">
          <div className="index-heading">
            <p>Reading order</p>
            <span>{filteredEntries.length}</span>
          </div>
          <label className="search-field">
            <Search aria-hidden="true" />
            <span className="sr-only">Search speeches and interviews</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search the book"
              className="archive-search-input"
            />
          </label>
          <div className="filter-row" aria-label="Filter by recording availability">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                className={filter === item.id ? 'filter-button is-active' : 'filter-button'}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <ol className="section-list">
            {filteredEntries.map((entry, index) => {
              const priorPart = filteredEntries[index - 1]?.part;
              return (
                <li key={entry.id}>
                  {entry.part !== priorPart && <p className="section-part">{entry.part}</p>}
                  <button
                    type="button"
                    className={entry.id === selected.id ? 'section-link is-active' : 'section-link'}
                    onClick={() => selectEntry(entry)}
                    aria-current={entry.id === selected.id ? 'page' : undefined}
                  >
                    <span className={`status-dot status-${entry.availability}`} aria-label={availabilityLabel[entry.availability]} />
                    <span className="section-copy">
                      <strong>{entry.title}</strong>
                      <small>{entry.year} · {availabilityLabel[entry.availability]}</small>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          {filteredEntries.length === 0 && (
            <div className="empty-index">
              <p>No passages match.</p>
              <button onClick={() => { setSearch(''); setFilter('all'); }}>Clear search</button>
            </div>
          )}
          <div className="index-key" aria-label="Recording availability key">
            <span><i className="status-dot status-full-video" />Full</span>
            <span><i className="status-dot status-partial-video" />Excerpt</span>
            <span><i className="status-dot status-full-audio" />Audio</span>
          </div>
        </aside>

        <article className="comparison" id={selected.id}>
          <div className="mobile-passages" aria-label="Passage navigation">
            <span>{selectedIndex + 1} / {entries.length}</span>
            <select value={selected.id} onChange={(event) => selectEntry(entries.find((entry) => entry.id === event.target.value) ?? selected)} aria-label="Choose a passage">
              {entries.map((entry) => <option value={entry.id} key={entry.id}>{entry.title}</option>)}
            </select>
          </div>

          <div className="comparison-heading">
            <div>
              <p className="eyebrow">{selected.part} · {selected.bookSection}</p>
              <h1>{selected.title}</h1>
            </div>
            <div className="event-meta">
              <p>{selected.event}</p>
              <p>{selected.date}</p>
              <p>{selected.venue}</p>
            </div>
          </div>

          <div className="view-switcher" aria-label="Comparison view">
            {(['book', 'compare', 'source'] as ViewMode[]).map((mode) => (
              <button key={mode} type="button" onClick={() => setViewMode(mode)} className={viewMode === mode ? 'view-button is-active' : 'view-button'}>
                {mode === 'source' ? 'Recording' : mode[0].toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>

          <div className="comparison-grid">
            <section className="book-panel" aria-labelledby="book-label">
              <div className="panel-label">
                <span id="book-label"><BookOpen aria-hidden="true" /> In the book</span>
                <span>{selected.year}</span>
              </div>
              <div className="book-copy">
                <p className="book-context">{selected.bookSection}</p>
                <blockquote>“{selected.quote}”</blockquote>
                <p className="book-note">{selected.note}</p>
              </div>
              <a className="text-link" href="https://book.stevejobsarchive.com/" target="_blank" rel="noreferrer">
                Read in the official book <ArrowUpRight aria-hidden="true" />
              </a>
            </section>

            <section className="recording-panel" aria-labelledby="recording-label">
              <div className="panel-label panel-label-dark">
                <span id="recording-label"><AvailabilityIcon availability={selected.availability} /> In the room</span>
                <span>{availabilityLabel[selected.availability]}</span>
              </div>

              {selected.youtubeId && playing ? (
                <div className="video-embed">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${selected.youtubeId}?autoplay=1&rel=0&start=${selected.timestamp ?? 0}`}
                    title={`${selected.event} recording`}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : selected.youtubeId ? (
                <button className="video-stage has-image" onClick={() => setPlaying(true)} aria-label={`Play ${selected.event}`}>
                  <img src={`https://i.ytimg.com/vi/${selected.youtubeId}/hqdefault.jpg`} alt="" />
                  <span className="video-shade" />
                  <span className="video-kicker">{selected.sourceName}</span>
                  <span className="play-control"><CirclePlay aria-hidden="true" /> Play recording</span>
                  <span className="video-duration">{selected.duration ?? 'Video'}</span>
                </button>
              ) : (
                <div className={`video-stage source-${selected.availability}`}>
                  <span className="video-kicker">{selected.sourceName}</span>
                  <span className="source-icon"><AvailabilityIcon availability={selected.availability} /></span>
                  <span className="source-message">
                    {selected.availability === 'not-found' ? 'No public recording located' : selected.availability === 'full-audio' ? 'Listen to the complete address' : 'Watch at the original source'}
                  </span>
                  {selected.sourceUrl && (
                    <a className="media-action" href={selected.sourceUrl} target="_blank" rel="noreferrer">
                      Open source <ArrowUpRight aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}

              {selected.availability !== 'not-found' && (
                <div className="timeline" aria-label="Recording timeline">
                  <span className="timeline-fill" style={{ width: progress }} />
                  <span className="timeline-marker" style={{ left: progress }} />
                </div>
              )}
              <div className="recording-caption">
                <span>{selected.timestampLabel ?? (selected.availability === 'not-found' ? '—' : 'Source')}</span>
                <p>{selected.relationship}</p>
              </div>
            </section>
          </div>

          <section className="alignment" aria-labelledby="alignment-title">
            <div className="alignment-title">
              <p className="eyebrow" id="alignment-title">How the sources relate</p>
              <span>{selected.relationship}</span>
            </div>
            <div className="alignment-row">
              <span>Book</span>
              <p>{selected.quote}</p>
            </div>
            <div className="alignment-row is-recording">
              <span>{selected.timestampLabel ?? 'Source'}</span>
              <p>{selected.availability === 'not-found' ? 'No public recording was found for comparison.' : selected.quote}</p>
              {selected.availability !== 'not-found' && <CirclePlay aria-hidden="true" />}
            </div>
            {selected.relationship.toLowerCase().includes('edited') && (
              <p className="cut-note"><span>✂</span> The book marks editorial cuts; the full recording continues where the text jumps.</p>
            )}
          </section>

          <nav className="sequence-nav" aria-label="Previous and next passages">
            <button type="button" onClick={() => stepTo(previous)} className="sequence-button sequence-previous">
              <ArrowLeft aria-hidden="true" />
              <span><small>Previous</small>{previous.title}</span>
            </button>
            <span className="sequence-count">{selectedIndex + 1} / {entries.length}</span>
            <button type="button" onClick={() => stepTo(next)} className="sequence-button sequence-next">
              <span><small>Next</small>{next.title}</span>
              <ArrowRight aria-hidden="true" />
            </button>
          </nav>

          <footer className="page-note" id="method">
            <p><strong>A section-by-section companion.</strong> This is a systematic audit of speech-derived passages, not a republication of the book.</p>
            <p>Minimal quotations link back to the official book and original recordings. Sources last checked August 31, 2026.</p>
          </footer>
        </article>
      </div>
    </main>
  );
}
