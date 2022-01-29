import Carousel, { CarouselItem } from "./carousel/Carousel";

export default function App() {
  return (
    <div className="App">
      <Carousel itemsShown={2}>
        <CarouselItem>purple</CarouselItem>
        <CarouselItem>black</CarouselItem>
        <CarouselItem>olive</CarouselItem>
        <CarouselItem>grey</CarouselItem>
        <CarouselItem>pink</CarouselItem>
      </Carousel>
    </div>
  );
}
