CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  select case
    when _user_id is null then false
    when _user_id = auth.uid()
      or coalesce(auth.role(), '') = 'service_role'
      or exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'admin')
    then exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
    else false
  end
$$;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.validate_diagnostic_answers()
RETURNS trigger LANGUAGE plpgsql SET search_path = public
AS $$
declare
  expected text[] := array['senhas_diferentes','dois_fatores','recuperacao','controle_acesso','bloqueio_celular','atualizacoes','copias','armazenamento','phishing','confere_identidade'];
  k text;
begin
  if jsonb_typeof(new.answers) <> 'object' then
    raise exception 'answers must be an object';
  end if;
  if (select count(*) from jsonb_object_keys(new.answers)) <> 10 then
    raise exception 'answers must contain exactly 10 entries';
  end if;
  foreach k in array expected loop
    if jsonb_typeof(new.answers -> k) is distinct from 'string'
       or length(new.answers ->> k) not between 1 and 30 then
      raise exception 'invalid answer for %', k;
    end if;
  end loop;
  return new;
end $$;
REVOKE EXECUTE ON FUNCTION public.validate_diagnostic_answers() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER validate_diagnostic_answers_trg
BEFORE INSERT OR UPDATE ON public.diagnostics
FOR EACH ROW EXECUTE FUNCTION public.validate_diagnostic_answers();