import React from "react";
import { FaUsers, FaFolder, FaBell } from "react-icons/fa";

/**
 * QuickLinks
 * A compact, professional quick-links row built with Tailwind CSS + daisyUI.
 * - Uses daisyUI's indicator + badge for primary color unread dots/numbers.
 * - Responsive: stacks on mobile, horizontal on md+.
 * - Props: followersCount, groupsCount, notificationsUnread
 *
 * Usage example:
 * <QuickLinks followersCount={124} groupsCount={8} notificationsUnread={3} />
 *
 * Requirements: Tailwind CSS + daisyUI in your project.
 */

const QuickLinks = ({
  followersCount = 0,
  groupsCount = 0,
  notificationsUnread = 0,
}) => {
  const fmt = (n) => {
    if (!n) return "";
    if (n > 99) return "99+";
    return String(n);
  };

  const items = [
    {
      key: "followers",
      href: "/followers",
      icon: <FaUsers className="text-lg" aria-hidden />,
      title: "Followers",
      label: fmt(followersCount),
      showLabelInSubtitle: true,
    },
    {
      key: "groups",
      href: "/groups/joined",
      icon: <FaFolder className="text-lg" aria-hidden />,
      title: "Joined Groups",
      label: fmt(groupsCount),
      showLabelInSubtitle: true,
    },
    {
      key: "notifications",
      href: "/notifications",
      icon: <FaBell className="text-lg" aria-hidden />,
      title: "Notifications",
      label: fmt(notificationsUnread),
      unread: notificationsUnread > 0,
    },
  ];

  return (
    <nav aria-label="Quick links" className="mt-4 w-full">
      <div className="bg-white rounded-2xl shadow-sm p-2">
        <div className="flex flex-col md:flex-row gap-2">
          {items.map((it) => (
            <a
              key={it.key}
              href={it.href}
              aria-label={it.title}
              className="flex items-center gap-4 flex-1 p-3 rounded-lg hover:bg-primary/10 focus:bg-primary/10 transition-transform duration-150 transform focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {/* icon + optional unread badge using daisyUI indicator */}
              <div className="indicator flex-none relative">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg font-semibold">
                  {it.icon}
                </div>

                {/* Unread badge: uses daisyUI badge + indicator-item for positioning */}
                {it.unread && (
                  <span className="indicator-item -top-1 -right-1 badge badge-primary badge-sm">
                    {it.label}
                  </span>
                )}
              </div>

              {/* text */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-base-content leading-tight">
                  {it.title}
                </div>
                {it.showLabelInSubtitle && (
                  <div className="text-xs text-muted mt-1">
                    {it.label || "0"} total
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default QuickLinks;
