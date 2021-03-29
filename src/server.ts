import app from './App';
import colors from 'colors';

try {
  app.listen(8080, () => {
    console.log(colors.blue('Server Listening on port 8080'));
    return;
  });
} catch (error) {
  console.log(colors.red(error));
}
