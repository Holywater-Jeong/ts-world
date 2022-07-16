import { Button } from '@ts-world/components';

export default function Web() {
  return (
    <div>
      <h1>정성수의 웹</h1>
      <Button onClick={() => alert('웹')}>버튼</Button>
    </div>
  );
}
