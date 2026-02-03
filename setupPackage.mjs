import fs from 'fs';
import path from 'path';

/**
 * 재귀적으로 dist 내의 하위 폴더를 탐색하여 exports map 생성
 * @param {string} distPath - 실제 디렉토리 경로
 * @param {string} basePath - 상대 경로 (ex: '.', 'buttons', 'buttons/Button')
 */
function createExportsMap(distPath, basePath = '.') {
	const exportsMap = basePath === '.' ? {
		'.': {
			import: './index.js',
			types: './index.d.ts'
		}
	} : {};
	
	const entries = fs.readdirSync(distPath, {withFileTypes: true});
	
	for (const entry of entries) {
		const entryPath = path.join(distPath, entry.name);
		const relativePath = path.join(basePath, entry.name).replace(/\\/g, '/');
		
		if (entry.isDirectory()) {
			const indexJsPath = path.join(entryPath, 'index.js');
			if (fs.existsSync(indexJsPath)) {
				exportsMap[`./${relativePath}`] = {
					import: `./${relativePath}/index.js`,
					types: `./${relativePath}/index.d.ts`
				};
			}
			
			// 재귀 호출
			Object.assign(exportsMap, createExportsMap(entryPath, relativePath));
		}
		
		if (entry.isFile() && entry.name.endsWith('.js')) {
			const baseFileName = entry.name.replace(/\.js$/, '');
			const jsFullPath = path.join(basePath, baseFileName).replace(/\\/g, '/');
			const shortName = jsFullPath.split('/').pop();
			exportsMap[`./${shortName}`] = {
				import: `./${jsFullPath}.js`,
				types: `./${jsFullPath}.d.ts`
			};
		}
	}
	
	return exportsMap;
}

function main() {
	const rootPackageJson = JSON.parse(
		fs.readFileSync('package.json', 'utf-8')
	);
	
	const distPath = path.resolve('./dist');
	const exports = createExportsMap(distPath);
	
	const newPackageJson = {
		name: rootPackageJson.name,
		version: rootPackageJson.version,
		description: rootPackageJson.description,
		license: rootPackageJson.license,
		repository: rootPackageJson.repository,
		module: './index.js',
		types: './index.d.ts',
		exports,
		keywords: rootPackageJson.keywords
	};
	
	fs.writeFileSync(
		path.join(distPath, 'package.json'),
		JSON.stringify(newPackageJson, null, 2),
		'utf-8'
	);
	
	fs.writeFileSync(
		path.join(distPath, 'version.txt'),
		rootPackageJson.version,
		'utf-8'
	);
	
	if (fs.existsSync('.npmignore')) {
		fs.copyFileSync('.npmignore', path.join(distPath, '.npmignore'));
	}
}

main();
