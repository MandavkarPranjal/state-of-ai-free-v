import fs from 'fs';
import path from 'path';
import { parse } from 'yaml';
import type { RatingsIndex, RatingsSnapshot } from './ratings';

function loadYaml<T>(filename: string): T {
	const filepath = path.join(process.cwd(), 'public/data', filename);
	const raw = fs.readFileSync(filepath, 'utf-8');
	return parse(raw) as T;
}

export function loadSnapshotData(snapshotId?: string) {
	const index = loadYaml<RatingsIndex>('index.yaml');
	const requested = snapshotId ?? index.defaultSnapshot;
	const meta = index.snapshots.find((s) => s.id === requested);
	
	if (!meta) {
		throw new Error('Snapshot not found');
	}

	const snapshot = loadYaml<RatingsSnapshot>(meta.file);

	return {
		index,
		snapshot,
		activeSnapshotId: meta.id
	};
}
