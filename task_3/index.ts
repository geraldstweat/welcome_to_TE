interface BallonI {
    id: number
    isPublic: boolean
}

/**
 * @description имитация fetch. возвращает количество шариков
 * @param {Number} id ID шарика по цвету
 * @returns {Number} количество шариков
 * @example const res = await fetchBallonAmount(202);
 */
async function fetchBallonAmount(id: BallonI['id']): Promise<number> {
	const RANDOM_TIMEOUT: number = Math.ceil(Math.random() * 10000); // 1-9 секунд
	const RANDOM_AMOUNT: number = Math.ceil(Math.random() * id); // случайное число

	return new Promise(resolve => setTimeout(() => resolve(RANDOM_AMOUNT), RANDOM_TIMEOUT));
}

// данные о шариках
const BALLONS: { [key: string]: BallonI } = {
	red: {
		id: 202,
		isPublic: true,
	},
	blue: {
		id: 356,
		isPublic: false,
	},
	yellow: {
		id: 451,
		isPublic: false,
	},
	black: {
		id: 35,
		isPublic: true,
	},
	green: {
		id: 191,
		isPublic: true,
	},
	white: {
		id: 911,
		isPublic: true,
	},
};

// Ваш код здесь

interface Balloon {
    id: number;
    isPublic: boolean;
}

async function fetchBalloonAmount(id: Balloon['id']): Promise<number> {
    const RANDOM_TIMEOUT: number = Math.ceil(Math.random() * 10000); // 1-9 seconds
    const RANDOM_AMOUNT: number = Math.ceil(Math.random() * id); // random number

    return new Promise(resolve => setTimeout(() => resolve(RANDOM_AMOUNT), RANDOM_TIMEOUT));
}

// Balloons data
const BALLOONS: { [key: string]: Balloon } = {
    red: { id: 202, isPublic: true },
    blue: { id: 356, isPublic: false },
    yellow: { id: 451, isPublic: false },
    black: { id: 35, isPublic: true },
    green: { id: 191, isPublic: true },
    white: { id: 911, isPublic: true },
};

// =======================
// Senior-level solution
// =======================

async function getTotalPublicBalloons(): Promise<number> {
    // Filter only public balloons
    const publicBalloons: Balloon[] = Object.values(BALLOONS).filter(balloon => balloon.isPublic);

    // Map to fetch promises
    const amountPromises: Promise<number>[] = publicBalloons.map(balloon => fetchBalloonAmount(balloon.id));

    // Wait for all fetches in parallel
    const amounts: number[] = await Promise.all(amountPromises);

    // Sum all amounts
    const total: number = amounts.reduce((sum, current) => sum + current, 0);

    return total;
}

// Example usage
(async () => {
    const totalPublicBalloons = await getTotalPublicBalloons();
    console.log('Total number of public balloons:', totalPublicBalloons);
})();
