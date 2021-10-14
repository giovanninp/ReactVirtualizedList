import Item from "./Item";
import List from "./List";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <List itemSize={50} height={300} itemsCount={10} renderItem={Item} />
    </div>
  );
}
