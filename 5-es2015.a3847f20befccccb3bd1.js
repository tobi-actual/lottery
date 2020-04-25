(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"Hpu/":function(s,t,e){"use strict";e.r(t),e.d(t,"BatchAssignerComponent",(function(){return k})),e.d(t,"BatchAssignerModule",(function(){return h}));var i=e("ofXK"),n=e("3Pt+"),r=e("Kj3r"),a=e("fXoL"),c=e("8z58"),o=e("YMqD"),b=e("pLZG"),l=e("lJxs"),u=e("/uUt"),d=e("kgdF"),p=e("wi0a"),g=e("YVN/");let m=(()=>{class s{constructor(s,t,e){this.lotteryStore=s,this.lotteryService=t,this.lotteriesQuery=e,this.activeTasks$=this.lotteriesQuery.selectActive().pipe(Object(b.a)(s=>void 0!==s),Object(l.a)(s=>Object(o.c)(s.assignedTasks)),Object(u.a)()),this.assignedTasks$=this.lotteriesQuery.selectActive().pipe(Object(b.a)(s=>void 0!==s),Object(l.a)(s=>{const t=[];for(var e in s.assignedTasks)t.push({name:e,assignees:s.assignedTasks[e]});return t}),Object(u.a)())}updateTasks(s){const t=Object(o.b)(s),e=this.lotteriesQuery.getActive();if(t.length>0&&e){let s;for(var i in s=e.assignedTasks?JSON.parse(JSON.stringify(e.assignedTasks)):new d.a,s)t.includes(i)||delete s[i];t.forEach(t=>{s[t]||(s[t]=[])}),this.lotteryStore.updateActive({assignedTasks:s})}}assignTasks(s){const t=Number(s),e=this.lotteriesQuery.getActive();if(!e)return;const i=e.participants.length;let n=JSON.parse(JSON.stringify(e.assignedTasks));for(let a=0;a<i;a++){let s;const e=[];for(var r in n){const i=n[r].length;if(i>=t)continue;let a=-i;s||(s=this.lotteryService.pickAWinner()),n[r].includes(s)||a++,e.push({name:r,points:a})}e.sort((s,t)=>t.points-s.points),e[0]&&n[e[0].name].push(s)}this.lotteryStore.updateActive({assignedTasks:n})}resetAssignments(){const s=this.lotteriesQuery.getActive();if(!s)return;let t=JSON.parse(JSON.stringify(s.assignedTasks));for(var e in t)t[e]=[];this.lotteryStore.updateActive({assignedTasks:t})}}return s.\u0275fac=function(t){return new(t||s)(a.Sb(p.a),a.Sb(c.a),a.Sb(g.a))},s.\u0275prov=a.Ab({token:s,factory:s.\u0275fac,providedIn:"root"}),s})();function f(s,t){if(1&s&&(a.Kb(0,"div"),a.sc(1),a.Jb()),2&s){const s=t.$implicit;a.rb(1),a.uc("- [ ] ",s,"")}}function v(s,t){if(1&s&&(a.Kb(0,"div"),a.sc(1),a.qc(2,f,2,1,"div",13),a.sc(3,"\n"),a.Jb()),2&s){const s=t.$implicit;a.rb(1),a.uc("## ",s.name,"\n\n"),a.rb(1),a.dc("ngForOf",s.assignees)}}let k=(()=>{class s{constructor(s,t,e){this.formBuilder=s,this.lotteryService=t,this.batchAssignerService=e,this.taskForm=this.formBuilder.group({tasks:["",{updateOn:"blur"}]})}ngOnInit(){this.batchAssignerService.activeTasks$.subscribe(s=>{this.taskForm.patchValue({tasks:s})}),this.taskForm.controls.tasks.valueChanges.pipe(Object(r.a)(100)).subscribe(s=>{this.batchAssignerService.updateTasks(s)})}}return s.\u0275fac=function(t){return new(t||s)(a.Eb(n.b),a.Eb(c.a),a.Eb(m))},s.\u0275cmp=a.yb({type:s,selectors:[["app-batch-assigner"]],decls:32,vars:13,consts:[[1,"row","mt-1",3,"formGroup"],[1,"col-sm-6"],[1,"form-group"],["for","tasks"],["formControlName","tasks","id","tasks","rows","5",1,"form-control"],[1,"form-text","text-muted"],["type","button",1,"btn","btn-outline-secondary","mr-1",3,"click"],[1,"mr-1"],["for","maxAssignmentsPerTask",1,"sr-only"],["type","text","id","maxAssignmentsPerTask","value","1","type","number",1,"form-control","form-control-inline","mr-1"],["maxAssignmentsPerTask",""],["for","assignedTasks"],["contenteditable","true",1,"result","mb-2"],[4,"ngFor","ngForOf"],["type","button",1,"btn","btn-outline-secondary","mr-2",3,"click"]],template:function(s,t){if(1&s){const s=a.Lb();a.Kb(0,"div",0),a.Kb(1,"div",1),a.Kb(2,"div",2),a.Kb(3,"label",3),a.sc(4,"Tasks"),a.Jb(),a.Fb(5,"textarea",4),a.Zb(6,"async"),a.Kb(7,"small",5),a.sc(8,"Enter the tasks as a comma or new line separated list"),a.Jb(),a.Jb(),a.Kb(9,"button",6),a.Wb("click",(function(){a.lc(s);const e=a.kc(17);return t.batchAssignerService.assignTasks(e.value)})),a.Zb(10,"async"),a.sc(11," Assign "),a.Jb(),a.Kb(12,"span",7),a.sc(13,"maximum"),a.Jb(),a.Kb(14,"label",8),a.sc(15,"Maximum assignments per task"),a.Jb(),a.Fb(16,"input",9,10),a.Kb(18,"span"),a.sc(19,"per task"),a.Jb(),a.Jb(),a.Kb(20,"div",1),a.Kb(21,"div",2),a.Kb(22,"label",11),a.sc(23,"Assigned Tasks"),a.Jb(),a.Kb(24,"div",12),a.Kb(25,"pre"),a.Kb(26,"code"),a.qc(27,v,4,2,"div",13),a.Zb(28,"async"),a.Jb(),a.Jb(),a.Jb(),a.Kb(29,"button",14),a.Wb("click",(function(){return t.batchAssignerService.resetAssignments()})),a.Zb(30,"async"),a.sc(31," Reset "),a.Jb(),a.Jb(),a.Jb(),a.Jb()}2&s&&(a.dc("formGroup",t.taskForm),a.rb(5),a.sb("disabled",a.ac(6,5,t.lotteryService.activeID$)?null:""),a.rb(4),a.sb("disabled",a.ac(10,7,t.lotteryService.activeID$)?null:""),a.rb(18),a.dc("ngForOf",a.ac(28,9,t.batchAssignerService.assignedTasks$)),a.rb(2),a.sb("disabled",a.ac(30,11,t.lotteryService.activeID$)?null:""))},directives:[n.i,n.d,n.a,n.h,n.c,i.e],pipes:[i.a],styles:[".form-control-inline[_ngcontent-%COMP%]{width:62px;display:inline}.result[_ngcontent-%COMP%]{border:1px solid #ced4da}"]}),s})(),h=(()=>{class s{}return s.\u0275mod=a.Cb({type:s}),s.\u0275inj=a.Bb({factory:function(t){return new(t||s)},imports:[[i.b,n.k]]}),s})()}}]);