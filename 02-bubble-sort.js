const array = [9, 26, 51, 2, 55, 3, 567, 12]

function bubble_sort(array) {
  //i代表比较的趟数
  for (let i = 1; i < array.length; i++) {
    //两两比较
    for (let j = 0; j < array.length - 1; j++) {
      let cache = array[j + 1]
      if (array[j] > array[j + 1]) {
        array[j + 1] = array[j]
        array[j] = cache
      }
    }
  }

  return array
}

let result = bubble_sort(array)
console.log(result)
