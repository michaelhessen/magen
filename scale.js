export function scaleForType(settings, typ) {
  if (typ === 'magont' && settings['smärtskala_magont']) return settings['smärtskala_magont'];
  if (typ === 'livmoder-ont' && settings['smärtskala_livmoder']) return settings['smärtskala_livmoder'];
  return settings['smärtskala'];
}

export function labelFor(settings, typ, level) {
  const s = scaleForType(settings, typ);
  return (s && s[level]) || '';
}
