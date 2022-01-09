const search = () => {
  return (
    <div>
      <div className="search-container">
        <div className="inner">
          <div className="search-wrapper">
            <div className="input-search-group">
              <h2>무엇을 찾고 계산가요?</h2>
              <div className="search-input">
                <input type="text" />
                <button>
                  <i className="fa fa-search" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="recent-search">
              <h2>최근검색</h2>
              <div className="recent-link-group">
                <a href="#none">html</a>
                <a href="#none">css</a>
                <a href="#none">javascript</a>
                <a href="#none">java</a>
                <a href="#none">sql</a>
                <a href="#none">html</a>
                <a href="#none">css</a>
                <a href="#none">javascript</a>
                <a href="#none">java</a>
                <a href="#none">sql</a>
                <a href="#none">html</a>
                <a href="#none">css</a>
                <a href="#none">javascript</a>
                <a href="#none">java</a>
                <a href="#none">sql</a>
                <a href="#none">html</a>
                <a href="#none">css</a>
                <a href="#none">javascript</a>
                <a href="#none">java</a>
                <a href="#none">sql</a>
                <a href="#none">html</a>
                <a href="#none">css</a>
                <a href="#none">javascript</a>
                <a href="#none">java</a>
                <a href="#none">sql</a>
              </div>
            </div>
            <div className="popuar-search">
              <h2>인기검색</h2>
              <div className="popuar-link-group">
                <a href="#none">html</a>
                <a href="#none">css</a>
                <a href="#none">javascript</a>
                <a href="#none">java</a>
                <a href="#none">sql</a>
                <a href="#none">html</a>
                <a href="#none">css</a>
                <a href="#none">javascript</a>
                <a href="#none">java</a>
                <a href="#none">sql</a>
                <a href="#none">html</a>
                <a href="#none">css</a>
                <a href="#none">javascript</a>
                <a href="#none">java</a>
                <a href="#none">sql</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .search-container {
          width: 100%;
          height: 100vh;
        }
        
        .search-container .search-wrapper {
          margin-top: 30px;
          height: 100vh;
        }
        
        .search-container .search-wrapper .input-search-group {
          margin-bottom: 70px;
        }
        
        .search-container .search-wrapper .input-search-group h2 {
          margin-bottom: 15px;
        }
        
        .search-container .search-wrapper .input-search-group .search-input input {
          width: 250px;
          height: auto;
          /* 높이값 초기화 */
          line-height: normal;
          /* line-height 초기화 */
          padding: .6em .5em;
          /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
          font-family: inherit;
          /* 폰트 상속 */
          border: 1px solid #c9c9c9;
          border-radius: 0;
          /* iSO 둥근모서리 제거 */
          outline-style: none;
          /* 포커스시 발생하는 효과 제거를 원한다면 */
          -webkit-appearance: none;
          /* 브라우저별 기본 스타일링 제거 */
          -moz-appearance: none;
          appearance: none;
        }
        
        .search-container .search-wrapper .input-search-group .search-input button {
          border: 1px solid #c9c9c9;
          width: 50px;
          padding: .6em .5em;
        }
        
        .search-container .search-wrapper .recent-search {
          margin-bottom: 70px;
        }
        
        .search-container .search-wrapper .recent-search h2 {
          margin-bottom: 15px;
        }
        
        .search-container .search-wrapper .recent-search .recent-link-group {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
              flex-wrap: wrap;
        }
        
        .search-container .search-wrapper .recent-search .recent-link-group a {
          border: 1px solid #eeeeee;
          border-radius: .5rem;
          margin-right: 10px;
          padding: .7em .7em;
          background-color: #3ae374;
          margin-bottom: 10px;
        }
        
        .search-container .search-wrapper .popuar-search {
          margin-bottom: 70px;
        }
        
        .search-container .search-wrapper .popuar-search h2 {
          margin-bottom: 15px;
        }
        
        .search-container .search-wrapper .popuar-search .popuar-link-group {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
              flex-wrap: wrap;
        }
        
        .search-container .search-wrapper .popuar-search .popuar-link-group a {
          border: 1px solid #eeeeee;
          border-radius: .5rem;
          margin-right: 10px;
          padding: .7em .7em;
          background-color: #3ae374;
          margin-bottom: 10px;
        }
        
        @media (min-width: 335px) and (max-width: 757px) {
          .search-container .inner {
            width: 100%;
          }
          .search-container .search-wrapper {
            width: 95%;
            margin: auto;
            margin-top: 30px;
          }
          .search-container .search-wrapper h2 {
            text-align: center;
          }
          .search-container .search-wrapper .input-search-group {
            margin-bottom: 20px;
          }
          .search-container .search-wrapper .input-search-group .search-input {
            text-align: center;
          }
          .search-container .search-wrapper .recent-search {
            margin-bottom: 20px;
          }
          .search-container .search-wrapper .recent-search .recent-link-group {
            -webkit-box-pack: center;
                -ms-flex-pack: center;
                    justify-content: center;
          }
          .search-container .search-wrapper .recent-search .recent-link-group a {
            display: block;
          }
          .search-container .search-wrapper .recent-search .recent-link-group a:nth-child(5n) {
            margin-right: 0px;
          }
          .search-container .search-wrapper .popuar-search .popuar-link-group {
            -webkit-box-pack: center;
                -ms-flex-pack: center;
                    justify-content: center;
          }
          .search-container .search-wrapper .popuar-search .popuar-link-group a {
            display: block;
          }
          .search-container .search-wrapper .popuar-search .popuar-link-group a:nth-child(5n) {
            margin-right: 0px;
          }
      `}</style>
    </div>
  );
};

export default search;
