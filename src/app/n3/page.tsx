"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Header from "@/components/Header";
import styles from "../n1/n1.module.css";

interface Category {
  id: string;
  icon: string;
  name: string;
  description: string;
  href: string;
  available: boolean;
  count?: string;
}

export default function N3Page() {
  const { t } = useLanguage();

  const categories: Category[] = [
    {
      id: "vocabulario",
      icon: "📝",
      name: t.categories.vocabulary.name,
      description: t.categories.vocabulary.description + " N3",
      href: "/n3/vocabulario",
      available: true,
      count: "800+",
    },
    {
      id: "kanji",
      icon: "✍️",
      name: t.categories.kanji.name,
      description: t.categories.kanji.description + " N3",
      href: "/n3/kanji",
      available: false,
    },
    {
      id: "gramatica",
      icon: "📖",
      name: t.categories.grammar.name,
      description: t.categories.grammar.description,
      href: "/n3/gramatica",
      available: false,
    },
    {
      id: "reading",
      icon: "📚",
      name: t.categories.reading.name,
      description: t.categories.reading.description,
      href: "/n3/reading",
      available: false,
    },
    {
      id: "listening",
      icon: "🎧",
      name: t.categories.listening.name,
      description: t.categories.listening.description,
      href: "/n3/listening",
      available: false,
    },
  ];

  return (
    <>
      <Header
        title="N3"
        subtitle={t.levels.n3.badge}
        backHref="/"
        gradient="linear-gradient(135deg, #ffd60a 0%, #ff9f0a 100%)"
      />
      <main className={styles.container}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`${styles.categoryCard} ${
              !category.available ? styles.disabled : ""
            }`}
          >
            {category.available ? (
              <Link href={category.href} className={styles.categoryLink}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryIcon}>{category.icon}</div>
                  <div className={styles.categoryInfo}>
                    <div className={styles.categoryName}>{category.name}</div>
                    <div className={styles.categoryDescription}>
                      {category.description}
                    </div>
                  </div>
                  {category.count && (
                    <div className={styles.categoryCount}>{category.count}</div>
                  )}
                  <div className={styles.arrow}>›</div>
                </div>
              </Link>
            ) : (
              <div className={styles.categoryLink}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryIcon}>{category.icon}</div>
                  <div className={styles.categoryInfo}>
                    <div className={styles.categoryName}>
                      {category.name}
                      <span className={styles.comingSoonBadge}>
                        {t.categories.comingSoon}
                      </span>
                    </div>
                    <div className={styles.categoryDescription}>
                      {category.description}
                    </div>
                  </div>
                  <div className={styles.arrow}>›</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </main>
    </>
  );
}
