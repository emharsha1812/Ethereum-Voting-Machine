import React from 'react'
import Link from 'next/link'

const StartEnd = (props) => {
  const btn = {
    display: 'block',
    padding: '21px',
    margin: '7px',
    minWidth: 'max-content',
    textAlign: 'center',
    width: '333px',
    alignSelf: 'center',
  }
  return (
    <div
      className="container-main"
      style={{ borderTop: '1px solid', marginTop: '0px' }}
    >
      {!props.elStarted ? (
        <>
          {/* edit here to display start election Again button */}
          {!props.elEnded ? (
            <>
              <div
                className="align-center  text-md m-auto mb-2 flex w-[977px] justify-center overflow-auto rounded-full bg-white p-[14px]"
                // style={{ display: 'block' }}
              >
                <h2 className="w-fit text-black">
                  Do not forget to add candidates.
                </h2>
                <p className="text-black">
                  Go to{' '}
                  <Link
                    title="Add a new "
                    href="/addcandidate"
                    style={{
                      color: 'black',
                      textDecoration: 'underline',
                    }}
                  >
                    <span className="text-black underline decoration-wavy  hover:cursor-pointer">
                      Add Candidates
                    </span>
                  </Link>{' '}
                  page.
                </p>
              </div>
              <div className="container-item">
                {/* <button type="submit" style={btn}>
                  Start Election {props.elEnded ? 'Again' : null}
                </button> */}
                <button class="btn btn-success" type="submit">
                  Start Election {props.elEnded ? 'Again' : null}
                </button>
              </div>
            </>
          ) : (
            <div className="container-item">
              <center>
                <p>Re-deploy the contract to start election again.</p>
              </center>
            </div>
          )}
          {props.elEnded ? (
            <div className="container-item">
              <center>
                <p>The election ended.</p>
              </center>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <div className="container-item">
            <center>
              <p className="m-2 rounded-lg bg-teal-400 p-2 text-lg text-black">
                The election started.
              </p>
            </center>
          </div>
          <div className="container-item">
            {/* <button
              type="button"
              // onClick={this.endElection}
              onClick={props.endElFn}
              style={btn}
            >
              End
            </button> */}
            <button class="btn btn-success" onClick={props.endElFn}>
              End
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default StartEnd
