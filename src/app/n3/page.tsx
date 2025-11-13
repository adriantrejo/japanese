"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getLevelCategories, addCategoryMetadata } from "@/lib/helpers/levelCategories";
import Header from "@/components/Header";
import styles from "../n1/n1.module.css";

export default function N3Page() {
  const { t } = useLanguage();
  
  const categories = addCategoryMetadata(
    getLevelCategories('n3', t),
    { vocabulary: { count: '800+' } }
  );

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
              <Link href={category.href} className={styles.categoryLink} prefetch={false}>
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
