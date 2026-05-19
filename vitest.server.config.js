import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        include: ['server/tests/**/*.test.js'],
        // Последовательный запуск тестовых файлов (нет гонок за общий ресурс)
        singleThread: true,
    },
});
