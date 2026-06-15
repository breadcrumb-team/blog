#!/usr/bin/env python3
"""Remap all post tags to the canonical tag set."""

import re
from pathlib import Path

POSTS = Path("/Volumes/sourcecode/projects-backup/Blog/src/content/posts")

# Canonical tag → posts mapping
REMAP = {
    "5-signs-your-team-needs-agentic-reporting.md":                ["AI", "Analytics"],
    "actionable-revenue-intelligence-vs-analytics.md":              ["Sports", "Analytics"],
    "ai-data-visualizations-for-business-scenarios.md":             ["AI", "Analytics"],
    "ai-fan-engagement-strategies-sports-marketing.md":             ["Sports", "AI"],
    "ai-powered-data-analysis-dashboard-tools.md":                  ["Product", "AI"],
    "ai-report-for-consultants.md":                                 ["Analytics"],
    "ai-reporting-without-learning-curve.md":                       ["AI", "Analytics"],
    "ai-tables-breadcrumb-product-update.md":                       ["Product"],
    "ai-tools-data-consultants-need-to-know.md":                    ["AI", "Analytics"],
    "airtable-integration-with-breadcrumb.md":                      ["How-To Guides"],
    "best-tableau-alternative-ai-reporting.md":                     ["Analytics"],
    "boost-efficiency-with-sharing-embedding-exporting.md":         ["How-To Guides", "Product"],
    "breadcrumb-ai-full-feature-walkthrough.md":                    ["How-To Guides"],
    "breadcrumb-smarter-customization-flexibility-insights.md":     ["Product"],
    "build-ai-interactive-dashboard-in-seconds.md":                 ["How-To Guides"],
    "carjitsu-nissan-sponsorship-case-study.md":                    ["Case Study", "Sports", "Sponsorship"],
    "complete-guide-to-kpi-reporting.md":                           ["Analytics", "How-To Guides"],
    "connect-eventbrite-ticket-tailor-analytics.md":                ["Live Events", "How-To Guides"],
    "cro-five-questions-revenue-diagnostic.md":                     ["Analytics"],
    "customers-tired-of-power-bi-reports.md":                       ["Analytics", "Product"],
    "data-analytics-live-events-industry-deep-dive.md":             ["Analytics", "Live Events", "AI"],
    "data-preparation-ai-agents-agentic-reporting.md":              ["AI", "Analytics"],
    "deliver-metrics-for-live-events.md":                           ["AI", "Live Events"],
    "enhanced-chart-controls.md":                                   ["Product"],
    "enhanced-data-display.md":                                     ["Product"],
    "fan-behavior-sports-stadium-engagement-analytics.md":          ["Live Events", "Sports"],
    "future-of-data-communication.md":                              ["Product"],
    "google-analytics-breadcrumb-analysis.md":                      ["Analytics", "How-To Guides"],
    "google-forms-survey-presentation-and-analysis.md":             ["How-To Guides"],
    "group-navigation-organization.md":                             ["Product"],
    "groups-for-data-vizualizations.md":                            ["Product"],
    "how-breadcrumb-helps-you-scale-collaboration.md":              ["Product"],
    "how-to-prepare-your-spreadsheet-for-data-analysis.md":         ["How-To Guides", "Analytics"],
    "how-to-present-reports.md":                                    ["How-To Guides", "Analytics"],
    "live-event-stadium-analytics-statistics-2025.md":              ["Live Events", "Analytics"],
    "make-event-data-valuable-with-ai.md":                          ["Live Events", "Analytics"],
    "more-control-and-speed-ai-analytics.md":                       ["Product"],
    "multi-tenant-database-segmentation-customer-reporting.md":     ["Analytics", "Product"],
    "new-data-analytics-aggregators.md":                            ["AI", "Product"],
    "new-data-experience-rebuilt-update.md":                        ["Product"],
    "new-data-sources-and-kpi.md":                                  ["Product"],
    "pivot-tables-vs-pivot-charts.md":                              ["Analytics", "How-To Guides"],
    "precision-analysis-reporting-efficiency-visualizations.md":    ["Analytics", "How-To Guides"],
    "premium-suite-revenue-sports-intelligence.md":                 ["Sports", "Sponsorship"],
    "pro-league-network-social-analytics-case-study.md":            ["Case Study", "Sports"],
    "prompting-guide-ai-data-analysis.md":                          ["How-To Guides", "AI"],
    "retool-analytics-dashboard-with-breadcrumb.md":                ["Product", "How-To Guides", "Analytics"],
    "self-service-data-products.md":                                ["Analytics"],
    "skip-excel-use-ai-for-insights.md":                            ["AI", "How-To Guides"],
    "smarter-conversational-ai.md":                                 ["Product"],
    "sports-renewal-revenue-ai.md":                                 ["Sports", "Sponsorship", "AI"],
    "sports-sponsorship-roi-analytics-renewal.md":                  ["Sports", "Sponsorship"],
    "streamlining-operations-data-analysis.md":                     ["Analytics"],
    "tableau-powerbi-limitations.md":                               ["Analytics"],
    "top-10-data-reporting-tools-external-reporting.md":            ["Analytics"],
    "turn-spreadsheet-into-dashboard.md":                           ["How-To Guides"],
    "vp-ticketing-90-day-plan.md":                                  ["Sports", "Analytics"],
    "what-is-agentic-reporting.md":                                 ["AI", "Live Events"],
    "zicket-ai-event-reporting-usecase.md":                         ["Case Study", "Live Events"],
}

TAG_LINE = re.compile(r'^tags:.*$', re.MULTILINE)

def fmt(tags):
    return 'tags: [' + ', '.join(f'"{t}"' for t in tags) + ']'

updated = []
for filename, new_tags in REMAP.items():
    path = POSTS / filename
    if not path.exists():
        print(f"MISSING: {filename}")
        continue
    text = path.read_text()
    new_text = TAG_LINE.sub(fmt(new_tags), text, count=1)
    if new_text != text:
        path.write_text(new_text)
        updated.append(filename)

print(f"Updated {len(updated)} files.")
for f in updated:
    print(f"  ✓ {f}")
