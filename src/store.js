import { liftShaftsCount } from './buildingConfig.js';

const lifts = {
  items: Array(liftShaftsCount)
    .fill({
      isAvailable: true,
      setIsAvailable(value) { this.isAvailable = value; },
      currentFloor: 1,
      setCurrentFloor(value) { this.currentFloor = value; },
    })
    .map((lift, index) => ({ ...lift, id: index + 1 })),
  getAvailableLifts() {
    return this.items.filter((lift) => lift.isAvailable);
  },
  isLiftOnTargetFloor(targetFloor) {
    return !!this
      .getAvailableLifts()
      .find((lift) => lift.currentFloor === targetFloor);
  },
  selectProperLift(targetFloor) {
    const availableLifts = this.getAvailableLifts();
    let minDistance = Infinity;
    let closestLiftId = null;
    availableLifts.forEach((lift) => {
      const currentLiftDistance = Math.abs(lift.currentFloor - targetFloor);
      if (currentLiftDistance < minDistance) {
        minDistance = currentLiftDistance;
        closestLiftId = lift.id;
      }
    });
    return closestLiftId;
  },
  selectLiftState(liftShaftIndex) { return this.items[liftShaftIndex - 1]; },
};

const callQueue = {
  isInProcessing: false,
  setIsInProcessing(isInProcessing) { this.isInProcessing = isInProcessing; },
  itemsInProcessing: new Set(),
  hasItemInProcessing(targetFloor) { return this.itemsInProcessing.has(targetFloor); },
  addToItemsInProcessing(item) { this.itemsInProcessing.add(item); },
  removeFromItemsInProcessing(item) { this.itemsInProcessing.delete(item); },
  items: [],
  isEmpty: true,
  hasItem(targetFloor) { return this.items.includes(targetFloor); },
  getFirstItem() { return this.items[0]; },
  addItem(targetFloor) {
    this.items.push(targetFloor);
    this.isEmpty = false;
  },
  removeFirstItem() {
    this.items = this.items.slice(1);
    this.isEmpty = this.items.length === 0;
  },
};

export {
  lifts,
  callQueue,
};
