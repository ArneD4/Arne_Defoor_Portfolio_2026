import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const sourceArg = process.argv[2];
const csvSource = sourceArg || process.env.PORTFOLIO_CSV_PATH || process.env.PORTFOLIO_CSV_URL || path.resolve(projectRoot, 'src/data/Portfolio_CMS - Projects.csv');
const outputPath = path.resolve(projectRoot, 'src/data/content.generated.json');

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(cell);
      cell = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i += 1;
      }
      row.push(cell);
      if (row.some((value) => value.trim() !== '')) {
        rows.push(row);
      }
      row = [];
      cell = '';
      continue;
    }

    cell += char;
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    if (row.some((value) => value.trim() !== '')) {
      rows.push(row);
    }
  }

  return rows;
}

async function loadCsvText(source) {
  if (source.startsWith('http://') || source.startsWith('https://')) {
    const response = await fetch(source);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${source}: ${response.status} ${response.statusText}`);
    }
    return response.text();
  }

  return fs.readFileSync(source, 'utf8');
}

function toProject(row) {
  const tools = [row['Tool 1'], row['Tool 2'], row['Tool 3'], row['Tool 4']]
    .filter(Boolean)
    .map((tool) => tool.trim());

  const images = [row['Image1'], row['Image2'], row['Image3'], row['Image4'], row['Image5']]
    .filter(Boolean)
    .map((image) => image.trim());

  const thumbnail = row['Thumbnail']?.trim() || '';
  const thumbnail2 = row['Thumbnail 2']?.trim() || '';
  const title = row['Project Name']?.trim() || 'Untitled project';
  const description = row['Description']?.trim() || 'A portfolio project.';
  const category = row['Category']?.trim() || 'Featured';
  const role = row['Role']?.trim() || 'Creative';
  const year = row['Year']?.trim() || '';
  const link = row['Link']?.trim() || '';

  return {
    slug: slugify(title),
    title,
    category,
    summary: description,
    role,
    year,
    link,
    tools,
    images,
    cardImage: thumbnail || thumbnail2 || images[0] || '',
    coverImage: thumbnail2 || thumbnail || images[0] || '',
    sections: [
      {
        title: 'Overview',
        content: description,
      },
      {
        title: 'Role',
        content: role,
      },
      {
        title: 'Year',
        content: year,
      },
      {
        title: 'Project link',
        content: link || 'Link coming soon.',
      },
    ],
  };
}

async function main() {
  const csvText = await loadCsvText(csvSource);
  const rows = parseCsv(csvText);

  if (rows.length < 2) {
    throw new Error('No data rows could be parsed from the CSV source.');
  }

  const [headers, ...records] = rows;
  const normalizedHeaders = headers.map((header) => header.trim());
  const projects = records
    .map((record) => {
      const row = Object.fromEntries(normalizedHeaders.map((header, index) => [header, record[index] ?? '']));
      return toProject(row);
    })
    .filter((project) => project.title);

  const content = {
    brand: {
      name: 'Portfolio',
      copy: 'Built with React, Vite, and a Google Sheets content workflow.',
    },
    home: {
      subtitle: 'Selected work',
      heading: 'Designing interfaces, visuals, and digital experiences.',
      description: 'This starter uses your sheet rows to populate the portfolio pages automatically.',
      heroImage: projects[0]?.coverImage || 'https://via.placeholder.com/640x480?text=Hero+Image',
    },
    about: {
      heading: 'About me',
      headline: 'Digital designer & developer',
      focus: 'Crafting thoughtful brands, interfaces, and interactive digital experiences.',
      tools: ['React', 'Three.js', 'GSAP', 'Figma'],
      description: 'I create digital products and visual identities that bring ideas to life across web and print.',
      points: [
        {
          title: 'Content-driven',
          text: 'A shared sheet keeps your copy and images aligned across design and development.',
        },
        {
          title: 'Responsive by default',
          text: 'The portfolio layouts scale from mobile to desktop without duplicating the content model.',
        },
        {
          title: 'Ready for 3D',
          text: 'The structure is already prepared for adding richer interactive experiences later.',
        },
      ],
    },
    projects,
  };

  fs.writeFileSync(outputPath, `${JSON.stringify(content, null, 2)}\n`, 'utf8');
  console.log(`Synced ${projects.length} projects from ${csvSource}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
