import ansiHtml from 'ansi-html';

const AnsibleOutput = ({ outputText }) => {
  // 使用ansi-html库将ANSI转义序列转化为HTML样式
  const formattedOutput = ansiHtml(outputText);

  return <pre dangerouslySetInnerHTML={{ __html: formattedOutput }} />;
};

export default AnsibleOutput;
