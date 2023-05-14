const UrlHistory = ({ allResult, displayDataInResult }) => {
  return (
    <div className="mt-4">
      {allResult && (
        <div>
          {allResult.map((item, index) => (
            <a
              href="#resultBox"
              onClick={() => displayDataInResult(item)}
              key={index}
              className="link_card text-blue-500"
            >
              {item.url}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default UrlHistory;
