import { Provider } from './provider';
import './main.css';

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
