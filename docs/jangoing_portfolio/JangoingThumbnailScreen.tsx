import styles from "./JangoingThumbnailScreen.module.css";
import type { SVGProps } from "react";

type InventoryItem = {
  emoji: string;
  name: string;
  status: string;
};

const inventoryItems: InventoryItem[] = [
  { emoji: "🥛", name: "Oat Milk", status: "Out of stock" },
  { emoji: "🥚", name: "Eggs", status: "2 available" },
  { emoji: "🥬", name: "Baby Spinach", status: "Use within 2 days" },
];

const tabs = [
  { label: "Home", icon: HomeIcon },
  { label: "Inventory", icon: InventoryIcon, active: true },
  { label: "Analytics", icon: AnalyticsIcon },
  { label: "Shopping", icon: ShoppingIcon },
  { label: "Search", icon: SearchIcon },
];

export default function JangoingThumbnailScreen() {
  return (
    <div className={styles.screen} aria-label="Jangoing inventory quick update preview">
      <div className={styles.inventoryPage}>
        <header className={styles.titlebar}>
          <h1>Inventory</h1>
          <span>Edit</span>
        </header>

        <div className={styles.filters} aria-hidden="true">
          <span className={styles.activeFilter}>All</span>
          <span>Produce</span>
          <span>Dairy &amp; Eggs</span>
          <span>Pantry</span>
        </div>

        <section className={styles.inventorySection}>
          <div className={styles.sectionHeading}>
            <h2>Dairy &amp; Eggs</h2>
            <span>2</span>
          </div>

          <div className={styles.itemList}>
            {inventoryItems.map((item) => (
              <article className={styles.itemRow} key={item.name}>
                <div className={styles.artwork} aria-hidden="true">
                  <span>{item.emoji}</span>
                  <b>{item.name}</b>
                </div>
                <div className={styles.itemCopy}>
                  <strong>{item.name}</strong>
                  <small>{item.status}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <nav className={styles.tabbar} aria-hidden="true">
          {tabs.map(({ label, icon: Icon, active }) => (
            <span className={active ? styles.activeTab : undefined} key={label}>
              <Icon />
              <small>{label}</small>
            </span>
          ))}
        </nav>
      </div>

      <div className={styles.scrim} aria-hidden="true" />

      <section className={styles.sheet} aria-label="Quick Update review">
        <div className={styles.grabber} aria-hidden="true" />

        <header className={styles.sheetHeader}>
          <span>Cancel</span>
          <h2>Quick Update</h2>
          <i aria-hidden="true" />
        </header>

        <div className={styles.sheetBody}>
          <label className={styles.commandField}>
            <span>Tell Jangoing what changed</span>
            <div>We&apos;re out of oat milk and eggs</div>
          </label>

          <div className={styles.reviewHeading}>
            <span>REMOVE ITEM</span>
            <small>Review before saving</small>
          </div>

          <div className={styles.reviewList}>
            <ReviewRow index="1" item="Oat Milk" detail="Remove item · Fridge" />
            <ReviewRow index="2" item="Eggs" detail="Remove item · Fridge" />
          </div>

          <p className={styles.reviewHint}>
            Review every field. Fix anything Jangoing misunderstood before saving.
          </p>

          <button className={styles.confirmButton} type="button" tabIndex={-1}>
            <CheckIcon />
            Confirm 2 Items
          </button>
        </div>
      </section>
    </div>
  );
}

function ReviewRow({
  index,
  item,
  detail,
}: {
  index: string;
  item: string;
  detail: string;
}) {
  return (
    <div className={styles.reviewRow}>
      <span className={styles.reviewIndex}>{index}</span>
      <div>
        <strong>{item}</strong>
        <small>{detail}</small>
      </div>
      <span className={styles.reviewCheck} aria-hidden="true">
        <CheckIcon />
      </span>
    </div>
  );
}

type IconProps = SVGProps<SVGSVGElement>;

function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="m5 12.5 4.2 4.2L19.5 6.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HomeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="m3.5 10.5 8.5-7 8.5 7v9a1 1 0 0 1-1 1h-5v-6h-5v6h-5a1 1 0 0 1-1-1v-9Z" fill="currentColor" />
    </svg>
  );
}

function InventoryIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}

function AnalyticsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5 20V12M12 20V5M19 20v-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function ShoppingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M7 9h10l1.2 11H5.8L7 9Z" fill="currentColor" />
      <path d="M9 9V7a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2.4" />
      <path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
