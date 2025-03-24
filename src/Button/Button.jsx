import styles from './Button.module.css'

export function Button(props) {
  const onClick = () => {
    props.onClick();
  }

  return <button
    className={`${styles.button} ${props.className ? props.className : ''}`}
    type='button'
    onClick={onClick}
    disabled={props.disabled}>
    {props.children}
  </button>
}