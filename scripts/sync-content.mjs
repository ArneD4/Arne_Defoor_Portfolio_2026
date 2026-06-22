import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const sourceArg = process.argv[2];
const csvSource = sourceArg || process.env.PORTFOLIO_CSV_PATH || process.env.PORTFOLIO_CSV_URL || path.resolve(projectRoot, 'src/data/Portfolio_CMS - Projects.csv');
const outputPath = path.resolve(projectRoot, 'src/data/content.generated.json');
const aboutCsvPath = path.resolve(projectRoot, 'src/data/Portfolio_CMS - About Me.csv');
const educationCsvPath = path.resolve(projectRoot, 'src/data/Portfolio_CMS - Education.csv');
const workExperienceCsvPath = path.resolve(projectRoot, 'src/data/Portfolio_CMS - Work Experience.csv');

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
  const role = row['Role']?.trim() || '';
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

function parseRecordsFromCsv(csvText) {
  const rows = parseCsv(csvText);

  if (rows.length < 2) {
    return [];
  }

  const [headers, ...records] = rows;
  const normalizedHeaders = headers.map((header) => header.trim());

  return records.map((record) => Object.fromEntries(normalizedHeaders.map((header, index) => [header, record[index] ?? ''])));
}

function toAbout(row) {
  const tools = [row['Tool 1'], row['Tool 2'], row['Tool 3'], row['Tool 4'], row['Tool 5']]
    .filter(Boolean)
    .map((tool) => tool.trim());

  return {
    headline: row['Headline']?.trim() || 'Digital designer & developer',
    focus: row['Focus']?.trim() || 'Crafting thoughtful brands, interfaces, and interactive digital experiences.',
    description: row['Main Bio']?.trim() || 'I create digital products and visual identities that bring ideas to life across web and print.',
    tools,
  };
}

function toEducation(row) {
  return {
    institution: row['Institution']?.trim() || '',
    degree: row['Degree']?.trim() || '',
    focus: row['Focus']?.trim() || '',
    years: row['Years']?.trim() || '',
    institutionUrl: row['Institution URL']?.trim() || '',
  };
}

function toWorkExperience(row) {
  return {
    company: row['Company']?.trim() || '',
    role: row['Role']?.trim() || '',
    focus: row['Focus']?.trim() || '',
    years: row['Years']?.trim() || '',
    companyUrl: row['Company URL']?.trim() || '',
  };
}

async function main() {
  const csvText = await loadCsvText(csvSource);
  const projectRows = parseRecordsFromCsv(csvText);

  if (projectRows.length < 1) {
    throw new Error('No project data rows could be parsed from the CSV source.');
  }

  const aboutCsvText = fs.readFileSync(aboutCsvPath, 'utf8');
  const educationCsvText = fs.readFileSync(educationCsvPath, 'utf8');
  const workExperienceCsvText = fs.readFileSync(workExperienceCsvPath, 'utf8');

  const aboutRows = parseRecordsFromCsv(aboutCsvText);
  const educationRows = parseRecordsFromCsv(educationCsvText);
  const workExperienceRows = parseRecordsFromCsv(workExperienceCsvText);

  const about = aboutRows[0] ? toAbout(aboutRows[0]) : {
    headline: 'Digital designer & developer',
    focus: 'Crafting thoughtful brands, interfaces, and interactive digital experiences.',
    description: 'I create digital products and visual identities that bring ideas to life across web and print.',
    tools: ['React', 'Three.js', 'GSAP', 'Figma'],
  };

  const projects = projectRows
    .map((record) => toProject(record))
    .filter((project) => project.title);

  const education = educationRows.map(toEducation).filter((item) => item.institution);
  const workExperience = workExperienceRows.map(toWorkExperience).filter((item) => item.company);

  const content = {
    brand: {
      name: 'Portfolio',
      copy: 'Built with React, Vite, and a Google Sheets content workflow.',
    },
    home: {
      subtitle: 'Selected work',
      heading: about.headline,
      description: about.focus,
      heroImage: projects[0]?.coverImage || 'https://via.placeholder.com/640x480?text=Hero+Image',
    },
    about: {
      heading: 'About me',
      headline: about.headline,
      focus: about.focus,
      tools: about.tools,
      description: about.description,
      education,
      workExperience,
      points: [],
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
