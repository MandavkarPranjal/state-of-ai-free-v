'use client';

import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { parse } from 'yaml';
import { Logo } from '@/components/Logo';
import { tagColors, type RatingsIndex, type RatingsSnapshot } from '@/lib/ratings';
import styles from './styles.module.css';

export default function Home() {
  const [data, setData] = useState<{
    index: RatingsIndex;
    snapshot: RatingsSnapshot;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const indexResponse = await fetch('/data/index.yaml');
        const indexText = await indexResponse.text();
        const indexData = parse(indexText) as RatingsIndex;

        const snapshotFile = indexData.snapshots[0].file;
        const snapshotResponse = await fetch(`/data/${snapshotFile}`);
        const snapshotText = await snapshotResponse.text();
        const snapshotData = parse(snapshotText) as RatingsSnapshot;

        setData({ index: indexData, snapshot: snapshotData });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className={styles.root}>
        <div className={styles.page}>Loading...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.root}>
        <div className={styles.page}>Error: {error || 'Failed to load data'}</div>
      </div>
    );
  }

  const { snapshot } = data;

  const asOfLabel = formatDate(snapshot.asOf);

  const sections = [
    { title: 'Models', num: '01', entries: snapshot.models },
    { title: 'Harnesses', num: '02', entries: snapshot.harnesses },
    { title: 'Subscriptions', num: '03', entries: snapshot.subs }
  ];

  return (
    <div className={styles.root}>
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerRow}>
            <span className={styles.label}>Rankings</span>
            <span className={styles.date}>{asOfLabel}</span>
          </div>
          <h1 className={styles.hero}>
            State<br />of AI
          </h1>
          <p className={styles.subhero}>for broke students</p>
          <div className={styles.meta}>
            <p className={styles.by}>
              by{' '}
              <a
                href="https://x.com/pr5dev"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.byLink}
              >
                Pranjal Mandavkar
              </a>
            </p>
            <p className={styles.note}>
              DISCLAIMER — this is all just my opinion, based on my experiences and what i've used. it
              is impossible to try everything at the level of depth i would like to, so i've decided to
              simply focus this site on the tools that i am using the most everyday
            </p>
          </div>
        </header>

        {sections.map((section) => (
          <section key={section.title} className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNum}>{section.num}</span>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
            </div>

            <div className={styles.grid}>
              {section.entries.map((item, i) => (
                <article
                  key={item.id}
                  className={`${styles.card} ${item.recommended ? styles.cardRecommended : ''}`}
                >
                  <div className={styles.cardTop}>
                    <span className={styles.cardRank}>{String(i + 1).padStart(2, '0')}</span>
                    <div className={styles.cardLogo}>
                      <Logo logoId={item.logoId} />
                    </div>
                    <div className={styles.cardInfo}>
                      <h3 className={styles.cardName}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer external"
                          className={styles.cardNameLink}
                        >
                          {item.name}
                        </a>
                      </h3>
                      {item.tags && item.tags.length > 0 && (
                        <div className={styles.cardTags}>
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`${styles.cardTag} ${tagColors[tag] ?? 'text-neutral-400/70 border-neutral-400/20'
                                }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {item.recommended && (
                      <span className={styles.recDot} title="Recommended"></span>
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardDesc}>
                      <MarkdownContent content={item.description} />
                    </div>
                    {(item.pros?.length || item.cons?.length) && (
                      <div className={styles.cardDetails}>
                        {item.pros && item.pros.length > 0 && (
                          <div>
                            <span className={styles.detailLabel}>+</span>
                            <ul className={styles.detailList}>
                              {item.pros.map((line, idx) => (
                                <li key={idx} className={styles.detailListItem}>
                                  {line}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {item.cons && item.cons.length > 0 && (
                          <div>
                            <span className={styles.detailLabel}>−</span>
                            <ul className={styles.detailList}>
                              {item.cons.map((line, idx) => (
                                <li key={idx} className={styles.detailListItem}>
                                  {line}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        <footer className={styles.footer}>
          <p>Snapshot for this period, not a live ranking.</p>
          <a
            href="https://github.com/MandavkarPranjal/state-of-ai-free-v"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function MarkdownContent({ content }: { content: string }) {
  const html = marked.parse(content, { async: false });
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html as string }}
      style={{
        '& p': { margin: '0.3rem 0' },
        '& a': { color: '#3b82f6', textDecoration: 'underline' },
        '& strong': { color: '#e5e5e5', fontWeight: 600 },
        '& ul, & ol': { margin: '0.3rem 0', paddingLeft: '1rem' },
        '& li': { margin: '0.15rem 0' }
      } as any}
    />
  );
}
