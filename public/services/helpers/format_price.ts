const formatPrice = (price: number): string => {
  const data = String(Number(price).toFixed(0)).split("").reverse();
  let ans: string[] = [];

    for (let i = data.length - 1; i >= 0; i--) {
        ans.push(data[i]);
        if (i !== 0 && i % 3 === 0) {
            ans.push('.');
        }
    }

  return ans.join("");
};

export default formatPrice;
