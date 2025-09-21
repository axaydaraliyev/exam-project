export function deleteCar(id) {
  window.cars = window.cars.filter((el) => el.id !== id);
  c
  
}

export function editCar(id, newcard) {
  window.cars = window.cars.map((car) => {
    if (car.id === id) {
      return { ...car, ...newcard };
    }
    return car;
  });
}
