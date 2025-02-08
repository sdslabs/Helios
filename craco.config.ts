import path from 'path';
module.exports = {
  webpack: {
    alias: {
      '@common': path.resolve(__dirname, 'src/common'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@auth': path.resolve(__dirname, 'src/modules/auth'),
      '@createQuiz': path.resolve(__dirname, 'src/modules/createQuiz'),
      '@checkQuiz': path.resolve(__dirname, 'src/modules/checkQuiz'),
      '@giveQuiz': path.resolve(__dirname, 'src/modules/giveQuiz'),
      '@dashboard': path.resolve(__dirname, 'src/modules/dashboard'),
    },
  },
  typescript:{
    enableTypeChecking:false
  }
};