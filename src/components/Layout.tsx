/** @jsx jsx */
import { FC } from 'react';
import { jsx, css } from '@emotion/core';
import { Link } from 'wouter';
import { useDispatch } from 'react-redux';
import { toggleColorMode } from '../store';
import Flex from './Flex';

const Layout: FC = ({ children }) => {
  const dispatch = useDispatch();

  const handleChangColorMode = () => {
    dispatch(toggleColorMode());
  };

  return (
    <div
      css={css`
        min-height: 100vh;
      `}
    >
      <header
        css={css`
          background: var(--background);
          position: sticky;
          padding: var(--xsmol) var(--xlrg);
          top: 0;
          z-index: 10;
          border-bottom: solid 1px var(--muted);
        `}
      >
        <Flex
          css={css`
            justify-content: space-between;
          `}
        >
          <Link
            href="/"
            css={css`
              font-weight: bold;
              font-size: var(--xlrg);
              text-decoration: none;
              color: var(--text);
              &:hover {
                opacity: 0.8;
              }
            `}
          >
            4ex4u
          </Link>
          <Flex>
            {/* Button with a "toggle dark mode" icon in it */}
            <button
              css={css`
                color: var(--text);
                cursor: pointer;
                background: none;
                &:hover {
                  opacity: 0.8;
                }
              `}
              onClick={handleChangColorMode}
              title="toggle dark mode"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 32 32"
                fill="currentcolor"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke="currentcolor"
                  strokeWidth="4"
                ></circle>
                <path d="M 16 0 A 16 16 0 0 0 16 32 z"></path>
              </svg>
            </button>
            {/* link to settings page */}
            <Link href="/settings">
              <a
                css={css`
                  color: currentColor;
                  margin-left: var(--smol);
                  &:hover {
                    opacity: 0.8;
                  }
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 14 14"
                  fill="currentcolor"
                >
                  <path d="M14,7.77 L14,6.17 L12.06,5.53 L11.61,4.44 L12.49,2.6 L11.36,1.47 L9.55,2.38 L8.46,1.93 L7.77,0.01 L6.17,0.01 L5.54,1.95 L4.43,2.4 L2.59,1.52 L1.46,2.65 L2.37,4.46 L1.92,5.55 L0,6.23 L0,7.82 L1.94,8.46 L2.39,9.55 L1.51,11.39 L2.64,12.52 L4.45,11.61 L5.54,12.06 L6.23,13.98 L7.82,13.98 L8.45,12.04 L9.56,11.59 L11.4,12.47 L12.53,11.34 L11.61,9.53 L12.08,8.44 L14,7.75 L14,7.77 Z M7,10 C5.34,10 4,8.66 4,7 C4,5.34 5.34,4 7,4 C8.66,4 10,5.34 10,7 C10,8.66 8.66,10 7,10 Z" />
                </svg>
              </a>
            </Link>
          </Flex>
        </Flex>
      </header>
      <main
        css={css`
          padding: var(--med) var(--xlrg);
          max-width: 1000px;
          margin: 0 auto;
        `}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
